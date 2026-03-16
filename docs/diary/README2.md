---
title: 入库订单系统
permalink: /diary/README2/
password: 200513
passwordHint: 请输入密码
---

# 入库订单系统 (Inbound Order System)

## 一、项目概述

本项目是一个基于Spring Boot的仓储管理系统入库订单接口实现，用于接收和处理来自ERP系统的XML格式入库订单报文。

### 技术栈

- **后端框架**: Spring Boot 3.2.0
- **数据库**: PostgreSQL / H2
- **ORM框架**: Spring Data JPA
- **XML解析**: JAXB (Jakarta XML Binding)
- **构建工具**: Maven
- **JDK版本**: Java 17

---

## 快速开始

### 方式1: 使用H2内存数据库（无需安装数据库，适合快速测试）

```bash
# 进入项目目录
cd inbound-order-system

# 使用H2配置启动
mvn spring-boot:run -Dspring-boot.run.profiles=h2
```

应用启动后，访问：

- 健康检查: http://localhost:8080/api/inbound-orders/health
- H2控制台: http://localhost:8080/h2-console

### 方式2: 使用PostgreSQL数据库

1. **创建数据库**（见5.1节）
2. **启动应用**:
   ```bash
   mvn spring-boot:run
   ```

---

## 二、需求分析

### 2.1 核心需求

1. **XML报文解析**: 解析ERP系统发送的入库订单XML报文
2. **数据持久化**: 将解析后的订单数据保存到PostgreSQL数据库
3. **数据更新**: 支持根据Order ID更新现有订单数据
4. **并发处理**: 支持多线程并发请求，防止同表修改的死锁
5. **接口测试**: 使用Postman工具测试接口功能

### 2.2 XML报文结构

XML报文采用标准的SAP IDOC格式，包含以下关键字段：

| 字段       | 说明       | 示例               |
| ---------- | ---------- | ------------------ |
| ORDERID    | 订单ID     | 000001154759       |
| MATERIAL   | 原材料编号 | 000000000010004741 |
| BATCH      | 批次号     | 3111009037         |
| PLANT      | 工厂       | 3111               |
| ENTRY_QNT  | 数量       | 500.000            |
| ENTRY_UOM  | 单位       | KG                 |
| PSTNG_DATE | 过账日期   | 20231011           |
| DOC_DATE   | 文档日期   | 20231011           |
| MOVE_TYPE  | 移动类型   | 101                |

---

## 三、系统设计

### 3.1 架构设计

系统采用经典的三层架构：

```
Controller层 (REST API)
    ↓
Service层 (业务逻辑)
    ↓
Repository层 (数据访问)
    ↓
数据库 (PostgreSQL)
```

### 3.2 数据库设计

#### 入库订单表 (inbound_order)

| 字段名     | 类型          | 约束               | 说明               |
| ---------- | ------------- | ------------------ | ------------------ |
| id         | BIGINT        | PK, AUTO_INCREMENT | 主键ID             |
| order_id   | VARCHAR(50)   | UNIQUE, NOT NULL   | 订单ID（业务主键） |
| material   | VARCHAR(50)   | NOT NULL           | 原材料编号         |
| batch      | VARCHAR(50)   | NOT NULL           | 批次号             |
| plant      | VARCHAR(50)   | NOT NULL           | 工厂               |
| entry_qnt  | DECIMAL(19,3) | NOT NULL           | 数量               |
| entry_uom  | VARCHAR(10)   | NOT NULL           | 单位               |
| doc_num    | VARCHAR(50)   |                    | 文档编号           |
| pstng_date | VARCHAR(8)    |                    | 过账日期           |
| doc_date   | VARCHAR(8)    |                    | 文档日期           |
| move_type  | VARCHAR(10)   |                    | 移动类型           |
| stck_type  | VARCHAR(10)   |                    | 库存类型           |
| profit_ctr | VARCHAR(20)   |                    | 利润中心           |
| created_at | TIMESTAMP     | NOT NULL           | 创建时间           |
| updated_at | TIMESTAMP     |                    | 更新时间           |
| version    | INT           | NOT NULL           | 版本号（乐观锁）   |

**索引设计**:

- 在`order_id`字段上创建唯一索引，提高查询效率

### 3.3 防死锁机制设计

为了防止并发场景下的死锁问题，系统实现了两种锁机制：

#### 3.3.1 悲观锁（Pessimistic Locking）

- **实现方式**: 使用JPA的`@Lock(LockModeType.PESSIMISTIC_WRITE)`注解
- **工作原理**: 在读取数据时直接加锁，其他事务必须等待
- **适用场景**: 高并发写入场景，确保数据一致性
- **Repository方法**:
  ```java
  @Lock(LockModeType.PESSIMISTIC_WRITE)
  Optional<InboundOrder> findByOrderId(String orderId);
  ```

#### 3.3.2 乐观锁（Optimistic Locking）

- **实现方式**: 使用JPA的`@Version`注解
- **工作原理**: 通过版本号检测冲突，冲突时抛出异常
- **适用场景**: 读多写少场景，提高并发性能
- **实现**:
  ```java
  @Version
  @Column(name = "version")
  private Integer version;
  ```

#### 3.3.3 锁机制对比

| 特性       | 悲观锁       | 乐观锁         |
| ---------- | ------------ | -------------- |
| 并发性能   | 较低（阻塞） | 较高（非阻塞） |
| 一致性保证 | 强           | 中等           |
| 适用场景   | 高并发写入   | 读多写少       |
| 实现复杂度 | 简单         | 需要处理冲突   |

### 3.4 多线程处理设计

#### 3.4.1 线程池配置

```java
- 核心线程数: 10
- 最大线程数: 50
- 队列容量: 200
- 拒绝策略: CallerRunsPolicy（由调用线程处理）
- 线程名称前缀: inbound-order-async-
```

#### 3.4.2 并发测试接口

系统提供两个并发测试接口：

1. **并发请求测试**: `/api/concurrent-test/concurrent-requests`
   - 模拟多线程同时向两个接口发送请求
   - 参数:
     - `threadCount`: 并发线程数（默认10）
     - `delaySeconds`: 延迟秒数（默认3）

2. **乐观锁冲突测试**: `/api/concurrent-test/optimistic-lock-test`
   - 模拟多个线程同时更新同一订单
   - 参数:
     - `threadCount`: 并发线程数（默认5）

---

## 四、实现流程

### 4.1 项目初始化

1. 创建Spring Boot项目，添加依赖：
   - Spring Boot Web Starter
   - Spring Boot Data JPA
   - PostgreSQL Driver
   - JAXB (XML解析)
   - Validation
   - Lombok

2. 配置数据源和JPA

### 4.2 XML报文解析

#### 步骤1: 创建XML映射类

使用JAXB注解将XML结构映射为Java对象：

```java
@XmlRootElement(name = "MBGMCR04")
public class XmlRequest {
    @XmlElement(name = "IDOC")
    private List<Idoc> idocs;
    // ...
}
```

#### 步骤2: 实现XML解析服务

```java
public XmlRequest parseXml(String xmlContent) throws JAXBException {
    JAXBContext context = JAXBContext.newInstance(XmlRequest.class);
    Unmarshaller unmarshaller = context.createUnmarshaller();
    StringReader reader = new StringReader(xmlContent);
    return (XmlRequest) unmarshaller.unmarshal(reader);
}
```

### 4.3 数据持久化

#### 步骤1: 创建实体类

```java
@Entity
@Table(name = "inbound_order")
public class InboundOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", unique = true)
    private String orderId;

    // ... 其他字段

    @Version
    private Integer version;
}
```

#### 步骤2: 创建Repository接口

```java
public interface InboundOrderRepository extends JpaRepository<InboundOrder, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<InboundOrder> findByOrderId(String orderId);
}
```

#### 步骤3: 实现业务服务

```java
@Transactional
public InboundOrder saveOrUpdateWithPessimisticLock(InboundOrder order) {
    // 使用悲观锁查询
    Optional<InboundOrder> existing = repository.findByOrderId(order.getOrderId());

    if (existing.isPresent()) {
        // 更新现有订单
        InboundOrder dbOrder = existing.get();
        // ... 更新字段
        return repository.save(dbOrder);
    } else {
        // 创建新订单
        return repository.save(order);
    }
}
```

### 4.4 REST API实现

创建Controller类，暴露以下接口：

| 方法   | 路径                                     | 说明           |
| ------ | ---------------------------------------- | -------------- |
| POST   | `/api/inbound-orders/receive-xml`        | 接收XML报文    |
| POST   | `/api/inbound-orders`                    | 创建或更新订单 |
| GET    | `/api/inbound-orders`                    | 查询所有订单   |
| GET    | `/api/inbound-orders/{id}`               | 根据ID查询订单 |
| GET    | `/api/inbound-orders/order-id/{orderId}` | 根据订单ID查询 |
| DELETE | `/api/inbound-orders/{id}`               | 删除订单       |
| GET    | `/api/inbound-orders/health`             | 健康检查       |

### 4.5 多线程并发处理

#### 步骤1: 配置异步线程池

```java
@Configuration
@EnableAsync
public class AsyncConfig {
    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(50);
        executor.setQueueCapacity(200);
        // ... 其他配置
        return executor;
    }
}
```

#### 步骤2: 实现并发测试接口

```java
@PostMapping("/concurrent-requests")
public ResponseEntity<Map<String, Object>> concurrentRequests(
        @RequestParam int threadCount,
        @RequestParam int delaySeconds) {

    List<CompletableFuture<String>> futures = new ArrayList<>();

    for (int i = 0; i < threadCount; i++) {
        // 模拟发送到接口1
        CompletableFuture<String> future1 = CompletableFuture.supplyAsync(
            () -> processOrderAsync(i, "接口1", delaySeconds),
            taskExecutor
        );

        // 模拟发送到接口2
        CompletableFuture<String> future2 = CompletableFuture.supplyAsync(
            () -> processOrderAsync(i, "接口2", delaySeconds),
            taskExecutor
        );

        futures.add(future1);
        futures.add(future2);
    }

    // 等待所有任务完成
    CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

    // 返回结果
    // ...
}
```

---

## 五、测试方案

### 5.1 环境准备

#### 选项1: 使用PostgreSQL（推荐用于生产环境）

1. **安装PostgreSQL**:
   - 下载地址: https://www.postgresql.org/
   - 安装并启动PostgreSQL服务

2. **创建数据库**:

   **方法A: 使用批处理脚本（Windows）**

   ```bash
   # 修改 setup-database.bat 中的PostgreSQL路径后运行
   setup-database.bat
   ```

   **方法B: 使用命令行**

   ```bash
   # 连接到PostgreSQL
   psql -U postgres

   # 创建数据库
   CREATE DATABASE inbound_order_db ENCODING 'UTF8';

   # 退出
   \q
   ```

   **方法C: 使用SQL命令**

   ```sql
   CREATE DATABASE inbound_order_db ENCODING 'UTF8';
   CREATE USER postgres WITH PASSWORD 'postgres';
   GRANT ALL PRIVILEGES ON DATABASE inbound_order_db TO postgres;
   ```

3. **修改配置文件**:
   编辑 `application.yml`，确保数据库连接信息正确：

   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/inbound_order_db
       username: postgres
       password: postgres
   ```

4. **启动应用**:
   ```bash
   mvn spring-boot:run
   ```

#### 选项2: 使用H2内存数据库（推荐用于快速测试）

H2数据库无需安装，数据存储在内存中，适合快速测试和演示。

1. **使用H2配置启动**:

   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=h2
   ```

2. **访问H2控制台**:
   - URL: http://localhost:8080/h2-console
   - JDBC URL: `jdbc:h2:mem:inbound_order_db`
   - 用户名: `sa`
   - 密码: (留空)

3. **验证启动**:
   访问 `http://localhost:8080/api/inbound-orders/health`

> **注意**: H2数据库的数据在应用重启后会丢失，仅用于测试。

### 5.2 Postman测试

导入提供的Postman测试集合：`Postman-Collection-Example.json`

#### 测试用例1: 健康检查

```http
GET http://localhost:8080/api/inbound-orders/health
```

#### 测试用例2: 接收XML报文

```http
POST http://localhost:8080/api/inbound-orders/receive-xml
Content-Type: application/xml

<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<MBGMCR04>
    <!-- 完整的XML报文内容 -->
</MBGMCR04>
```

#### 测试用例3: 创建或更新订单

```http
POST http://localhost:8080/api/inbound-orders
Content-Type: application/json

{
    "orderId": "000001154759",
    "material": "000000000010004741",
    "batch": "3111009037",
    "plant": "3111",
    "entryQnt": 500.000,
    "entryUom": "KG"
}
```

#### 测试用例4: 并发测试

```http
POST http://localhost:8080/api/concurrent-test/concurrent-requests?threadCount=10&delaySeconds=1
```

#### 测试用例5: 乐观锁冲突测试

```http
POST http://localhost:8080/api/concurrent-test/optimistic-lock-test?threadCount=5
```

### 5.3 测试验证

1. **数据库验证**:

   ```sql
   SELECT * FROM inbound_order ORDER BY created_at DESC;
   ```

2. **日志验证**:
   查看控制台日志，确认：
   - XML解析成功
   - 数据保存成功
   - 并发请求正常处理
   - 锁机制生效

3. **多线程验证**:
   - 同时启动两个应用实例（不同端口）
   - 使用Postman或脚本并发发送请求
   - 观察数据库数据一致性

---

## 六、关键技术点

### 6.1 XML解析

- 使用JAXB进行XML到Java对象的映射
- 支持嵌套结构的解析
- 处理XML中的属性和元素

### 6.2 事务管理

- 使用Spring的`@Transactional`注解
- 确保数据操作的原子性
- 配置事务传播行为和隔离级别

### 6.3 并发控制

- **悲观锁**: 在读取时加锁，防止并发修改
- **乐观锁**: 使用版本号检测冲突
- **线程池**: 合理配置线程池参数

### 6.4 性能优化

- 数据库索引优化
- 批量操作支持
- 连接池配置（HikariCP）

---

## 七、项目结构

```
inbound-order-system/
├── src/
│   ├── main/
│   │   ├── java/com/wms/inbound/
│   │   │   ├── InboundOrderApplication.java      # 启动类
│   │   │   ├── config/
│   │   │   │   └── AsyncConfig.java              # 异步配置
│   │   │   ├── controller/
│   │   │   │   ├── InboundOrderController.java  # 订单接口
│   │   │   │   └── ConcurrentTestController.java # 并发测试接口
│   │   │   ├── dto/
│   │   │   │   └── XmlRequest.java               # XML映射类
│   │   │   ├── entity/
│   │   │   │   └── InboundOrder.java             # 订单实体
│   │   │   ├── repository/
│   │   │   │   └── InboundOrderRepository.java   # 数据访问接口
│   │   │   └── service/
│   │   │       ├── XmlParserService.java         # XML解析服务
│   │   │       └── InboundOrderService.java      # 订单业务服务
│   │   └── resources/
│   │       ├── application.yml                   # 应用配置（PostgreSQL）
│   │       ├── application-h2.yml                # 应用配置（H2数据库）
│   │       └── sample-inbound-order.xml          # 示例XML
│   └── test/
├── pom.xml                                       # Maven配置
├── setup-database.bat                            # 数据库创建脚本（Windows）
├── Postman-Collection-Example.json               # Postman测试集合
└── README.md                                     # 项目说明
```

---

## 八、总结

### 8.1 实现的功能

✅ XML报文解析
✅ 入库订单CRUD操作
✅ 数据持久化到PostgreSQL
✅ 支持订单更新（相同Order ID）
✅ 悲观锁和乐观锁机制
✅ 多线程并发处理
✅ 防死锁机制
✅ Postman测试接口

### 8.2 技术亮点

1. **双层锁机制**: 同时实现悲观锁和乐观锁，适应不同场景
2. **线程池管理**: 合理配置线程池，支持高并发
3. **XML解析**: 使用JAXB进行高效的XML解析
4. **事务管理**: 确保数据一致性
5. **RESTful API**: 设计规范的REST接口

### 8.3 扩展建议

1. 添加数据校验和异常处理
2. 实现订单审批流程
3. 添加接口认证和授权
4. 实现消息队列异步处理
5. 添加接口文档（Swagger）
6. 实现数据备份和恢复
7. 添加日志审计功能
8. 实现分布式部署

---

## 九、联系方式

如有问题或建议，请联系开发团队。

---

**项目创建时间**: 2026年3月14日
**项目版本**: v1.0.0

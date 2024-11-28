-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: numenera
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS numenera;
CREATE DATABASE numenera;

--
-- Table structure for table `plan_type`
--

DROP TABLE IF EXISTS numenera.`plan_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE numenera.`plan_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_type`
--

LOCK TABLES numenera.`plan_type` WRITE;
/*!40000 ALTER TABLE `plan_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `plan_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `source`
--

DROP TABLE IF EXISTS numenera.`source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE numenera.`source` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `source`
--

LOCK TABLES numenera.`source` WRITE;
/*!40000 ALTER TABLE `source` DISABLE KEYS */;
/*!40000 ALTER TABLE `source` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artefact`
--

DROP TABLE IF EXISTS numenera.`artefact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE numenera.`artefact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `level` int NOT NULL,
  `forms` text NOT NULL,
  `depletion` text NOT NULL,
  `source_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `artefact_ibfk_1` FOREIGN KEY (`source_id`) REFERENCES numenera.`source` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artefact`
--

LOCK TABLES numenera.`artefact` WRITE;
/*!40000 ALTER TABLE `artefact` DISABLE KEYS */;
/*!40000 ALTER TABLE `artefact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `automaton`
--

DROP TABLE IF EXISTS numenera.`automaton`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE numenera.`automaton` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `level` int NOT NULL,
  `material` text NOT NULL,
  `depletion` text NOT NULL,
  `modification` text NOT NULL,
  `reproduction` text NOT NULL,
  `source_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `automaton_ibfk_1` FOREIGN KEY (`source_id`) REFERENCES numenera.`source` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `automaton`
--

LOCK TABLES numenera.`automaton` WRITE;
/*!40000 ALTER TABLE `automaton` DISABLE KEYS */;
/*!40000 ALTER TABLE `automaton` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cypher`
--

DROP TABLE IF EXISTS numenera.`cypher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE numenera.`cypher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `level` int NOT NULL,
  `forms` text NOT NULL,
  `source_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `source_id` FOREIGN KEY (`source_id`) REFERENCES numenera.`source` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cypher`
--

LOCK TABLES numenera.`cypher` WRITE;
/*!40000 ALTER TABLE `cypher` DISABLE KEYS */;
/*!40000 ALTER TABLE `cypher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `installation`
--

DROP TABLE IF EXISTS numenera.`installation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE numenera.`installation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `level` int NOT NULL,
  `material` text NOT NULL,
  `depletion` text NOT NULL,
  `modification` text NOT NULL,
  `source_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `installation_ibfk_1` FOREIGN KEY (`source_id`) REFERENCES numenera.`source` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `installation`
--

LOCK TABLES numenera.`installation` WRITE;
/*!40000 ALTER TABLE `installation` DISABLE KEYS */;
/*!40000 ALTER TABLE `installation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `odity`
--

DROP TABLE IF EXISTS numenera.`odity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE numenera.`odity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `odity`
--

LOCK TABLES numenera.`odity` WRITE;
/*!40000 ALTER TABLE `odity` DISABLE KEYS */;
/*!40000 ALTER TABLE `odity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS numenera.`plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE numenera.`plan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `min_level` int NOT NULL,
  `source_id` int NOT NULL,
  `plan_type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `source_id` (`source_id`),
  KEY `plan_type_id` (`plan_type_id`),
  CONSTRAINT `plan_ibfk_1` FOREIGN KEY (`plan_type_id`) REFERENCES numenera.`plan_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `plan_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES numenera.`source` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES numenera.`plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS numenera.`vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE numenera.`vehicle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `level` int NOT NULL,
  `material` text NOT NULL,
  `depletion` text NOT NULL,
  `modification` text NOT NULL,
  `source_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`source_id`) REFERENCES numenera.`source` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES numenera.`vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

-- Dump completed on 2024-11-28 15:03:36

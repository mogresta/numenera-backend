-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 19, 2024 at 02:23 PM
-- Server version: 8.0.40-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `numenera`
--
CREATE DATABASE IF NOT EXISTS `numenera` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `numenera`;

-- --------------------------------------------------------

--
-- Table structure for table `character`
--

DROP TABLE IF EXISTS `character`;
CREATE TABLE `character` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `description` text,
  `tier` text NOT NULL,
  `user_id` int NOT NULL,
  `type_id` int NOT NULL,
  `deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `character_type`
--

DROP TABLE IF EXISTS `character_type`;
CREATE TABLE `character_type` (
  `id` int NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `character_type`
--

INSERT INTO `character_type` (`id`, `name`) VALUES
(1, 'Nano'),
(2, 'Jack'),
(3, 'Glaive'),
(4, 'Arkus'),
(5, 'Wright'),
(6, 'Delve');

-- --------------------------------------------------------

--
-- Table structure for table `group_inventory`
--

DROP TABLE IF EXISTS `group_inventory`;
CREATE TABLE `group_inventory` (
  `id` int NOT NULL,
  `character_id` int NOT NULL,
  `item_id` int NOT NULL,
  `expended` tinyint(1) DEFAULT NULL,
  `loaned` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory` (
  `id` int NOT NULL,
  `character_id` int NOT NULL,
  `slots` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_item`
--

DROP TABLE IF EXISTS `inventory_item`;
CREATE TABLE `inventory_item` (
  `id` int NOT NULL,
  `inventory_id` int NOT NULL,
  `item_id` int NOT NULL,
  `expended` tinyint(1) DEFAULT NULL,
  `group_inventory_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `level` int DEFAULT NULL,
  `forms` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `depletion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `material` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `modification` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `reproduction` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `type` int DEFAULT NULL,
  `plan_type` int DEFAULT NULL,
  `source` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plan_type`
--

DROP TABLE IF EXISTS `plan_type`;
CREATE TABLE `plan_type` (
  `id` int NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `plan_type`
--

INSERT INTO `plan_type` (`id`, `name`) VALUES
(1, 'Cypher'),
(2, 'Installation'),
(3, 'Artefact'),
(4, 'Automaton'),
(5, 'Vehicle');

-- --------------------------------------------------------

--
-- Table structure for table `source`
--

DROP TABLE IF EXISTS `source`;
CREATE TABLE `source` (
  `id` int NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `source`
--

INSERT INTO `source` (`id`, `name`) VALUES
(1, 'Destiny'),
(2, 'Discovery'),
(3, 'Building Tomorrow'),
(4, 'Into the Deep'),
(5, 'Technology Compendium'),
(6, 'Artifacts & Oddities'),
(7, 'Cypher Collection I'),
(8, 'Extreme Cyphers'),
(9, 'Edge of the Sun'),
(10, 'Torment'),
(11, 'Vertices'),
(12, 'Liminal Shore'),
(13, 'Voices of the Datasphere'),
(14, 'Into the Outside'),
(15, 'Priests of the Aeons'),
(16, 'Love & Sex in the Ninth World'),
(17, 'Exploring Numenera: Strand'),
(18, 'Weird Discoveries'),
(19, 'Explorer\'s Keys');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`id`, `name`) VALUES
(1, 'Artefact'),
(2, 'Automaton'),
(3, 'Cypher'),
(4, 'Installation'),
(5, 'Oddity'),
(6, 'Plan'),
(7, 'Vehicle');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(4, 'Mario', 'mario@random.com', '$2a$10$NnEsyxlTPkTO2sI9DZQeu..wz7cryD/kY9atCbFSQfuhP8tBqfdDa', '2024-12-17 14:05:42', '2024-12-17 14:05:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `character`
--
ALTER TABLE `character`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `character_type_id` (`type_id`);

--
-- Indexes for table `character_type`
--
ALTER TABLE `character_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_inventory`
--
ALTER TABLE `group_inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `character_id` (`character_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `character_id` (`character_id`);

--
-- Indexes for table `inventory_item`
--
ALTER TABLE `inventory_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `inventory_id` (`inventory_id`) USING BTREE,
  ADD KEY `group_inventory_id` (`group_inventory_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`type`),
  ADD KEY `plan_type` (`plan_type`),
  ADD KEY `source` (`source`);

--
-- Indexes for table `plan_type`
--
ALTER TABLE `plan_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `source`
--
ALTER TABLE `source`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `character`
--
ALTER TABLE `character`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `character_type`
--
ALTER TABLE `character_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `group_inventory`
--
ALTER TABLE `group_inventory`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_item`
--
ALTER TABLE `inventory_item`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plan_type`
--
ALTER TABLE `plan_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `source`
--
ALTER TABLE `source`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `character`
--
ALTER TABLE `character`
  ADD CONSTRAINT `character_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `character_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `character_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `group_inventory`
--
ALTER TABLE `group_inventory`
  ADD CONSTRAINT `group_inventory_ibfk_3` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `group_inventory_ibfk_4` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `inventory_item`
--
ALTER TABLE `inventory_item`
  ADD CONSTRAINT `inventory_item_ibfk_1` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_item_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_item_ibfk_3` FOREIGN KEY (`group_inventory_id`) REFERENCES `group_inventory` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

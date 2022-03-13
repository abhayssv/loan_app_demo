-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 02, 2021 at 10:10 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbo_vizzve`
--

-- --------------------------------------------------------

--
-- Table structure for table `vizzve_app_users`
--

CREATE TABLE `vizzve_app_users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `mobile_no` varchar(20) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0- Active, 1- Inactive',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vizzve_app_users`
--

INSERT INTO `vizzve_app_users` (`user_id`, `username`, `email`, `mobile_no`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(20, 'Devil Evil', 'devilevil789devloper@gmail.com', NULL, 0, '2021-04-25 11:16:58', '2021-04-28 11:48:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vizzve_contacts`
--

CREATE TABLE `vizzve_contacts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `f_name` varchar(200) NOT NULL,
  `l_name` varchar(200) NOT NULL,
  `mobile_no` varchar(20) NOT NULL,
  `email` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `vizzve_users`
--

CREATE TABLE `vizzve_users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) CHARACTER SET latin1 NOT NULL,
  `firstname` varchar(100) CHARACTER SET latin1 NOT NULL,
  `lastname` varchar(100) CHARACTER SET latin1 NOT NULL,
  `password` varchar(256) CHARACTER SET latin1 DEFAULT NULL,
  `profile_image` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `mobile_no` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `user_type` tinyint(4) NOT NULL DEFAULT 2 COMMENT 'user_type = 0 (admin) ,user_type = 1 (lawyer) ,user_type = 2 (client) ',
  `is_admin` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'is_admin = 1 (admin) ,is_admin = 0 (user) ',
  `active` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0 = Inactive , 1 = active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `vizzve_users`
--

INSERT INTO `vizzve_users` (`id`, `email`, `firstname`, `lastname`, `password`, `profile_image`, `mobile_no`, `user_type`, `is_admin`, `active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'development@zeksta.com', 'Deepak', 'Mishra', '521b2d4fdc9d5b4d8c525f10a8e8aa22b2b4795e8776487a0b5b0e336ebb7548010b71ecdfb76484492e6422c3734616c60922cbbe568ac51eb81d4d6f9a66d5', '1-1569320885392.jpg', '100009', 0, 1, 0, '2021-04-14 11:49:55', '2021-04-17 08:23:58', NULL),
(11, 'abhay.kumar@zeksta.com', 'Abhay', 'Kumar', 'd50b576798d5ec67ca2cca18faf2fd8bba9b0098f3a5b1dae26b2e1bdc5ba1984d20e8c07225ecaa2a4d37f9641550238b697b7ee414bff660f01b1f49d4957c', 'value', '9638807702', 0, 1, 1, '2021-04-16 11:15:15', '2021-04-16 11:15:15', NULL),
(12, 'admin@gmail.com', 'Deval', 'Patel', '521b2d4fdc9d5b4d8c525f10a8e8aa22b2b4795e8776487a0b5b0e336ebb7548010b71ecdfb76484492e6422c3734616c60922cbbe568ac51eb81d4d6f9a66d5', NULL, NULL, 0, 1, 1, '2021-04-21 10:54:16', '2021-04-21 10:54:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vizzve_user_otp`
--

CREATE TABLE `vizzve_user_otp` (
  `id` int(11) NOT NULL,
  `mobile_no` varchar(100) NOT NULL,
  `otp` int(11) NOT NULL,
  `generation_time` time NOT NULL,
  `expire_time` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vizzve_user_otp`
--

INSERT INTO `vizzve_user_otp` (`id`, `mobile_no`, `otp`, `generation_time`, `expire_time`, `created_at`, `updated_at`, `deleted_at`) VALUES
(24, '6307715099', 3555, '08:35:01', '08:36:01', '2021-05-01 10:06:35', '2021-05-01 15:05:01', NULL),
(25, '8707723698', 5261, '04:41:12', '04:42:12', '2021-05-01 10:46:11', '2021-05-01 11:11:12', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `vizzve_app_users`
--
ALTER TABLE `vizzve_app_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vizzve_users`
--
ALTER TABLE `vizzve_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vizzve_user_otp`
--
ALTER TABLE `vizzve_user_otp`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile_no` (`mobile_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vizzve_app_users`
--
ALTER TABLE `vizzve_app_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `vizzve_users`
--
ALTER TABLE `vizzve_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `vizzve_user_otp`
--
ALTER TABLE `vizzve_user_otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;


-- --------------------------------------------------------

--
-- Table structure for table `vizzve_email_settings`
--

DROP TABLE IF EXISTS `vizzve_email_settings`;
CREATE TABLE IF NOT EXISTS `vizzve_email_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email_type` varchar(127) NOT NULL,
  `email_name` varchar(127) NOT NULL,
  `active` tinyint NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vizzve_email_settings`
--

INSERT INTO `vizzve_email_settings` (`id`, `email_type`, `email_name`, `active`, `updated_at`) VALUES
(1, 'SENDGRID_EMAIL', 'SENDGRID', 0, '2021-11-17 17:07:44'),
(2, 'GSUITE_EMAIL', 'G SUITE', 1, '2021-11-17 17:07:44');




ALTER TABLE `vizzve_apply_loan` ADD `reason_to_reject` VARCHAR(500) NULL AFTER `collection_manager`;

DROP TABLE IF EXISTS `vizzve_settings`;
CREATE TABLE IF NOT EXISTS `vizzve_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `aadar_verification` int DEFAULT '0',
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vizzve_settings`
--

INSERT INTO `vizzve_settings` (`id`, `aadar_verification`, `updated_at`) VALUES
(1, 0, '2021-12-02');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


DROP TABLE IF EXISTS `vizzve_add_reminder`;
CREATE TABLE IF NOT EXISTS `vizzve_add_reminder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `choose_date` datetime NOT NULL,
  `description` varchar(500) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


ALTER TABLE `vizzve_app_business_payments` ADD `tx_date` DATETIME NULL AFTER `tx_time`;

ALTER TABLE `vizzve_kyc_details` ADD `pan_status` INT(1) NOT NULL DEFAULT '0' AFTER `pan_no`;

DROP TABLE IF EXISTS `vizzve_extension_deal`;
CREATE TABLE IF NOT EXISTS `vizzve_extension_deal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenure` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `vizzve_add_reminder` ADD `loan_id` INT(100) NOT NULL AFTER `status`;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2026 at 06:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fms_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `bill_id` int(11) UNSIGNED NOT NULL,
  `vendor_id` int(11) UNSIGNED NOT NULL,
  `bill_number` varchar(100) DEFAULT NULL,
  `bill_date` date NOT NULL,
  `bill_amount` decimal(12,2) NOT NULL,
  `bill_file` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`bill_id`, `vendor_id`, `bill_number`, `bill_date`, `bill_amount`, `bill_file`, `status`, `created_at`, `updated_at`) VALUES
(11, 13, 'EXP-25', '2026-03-04', 500.00, 'uploads/bills/1772614695_888952c2dc0955a2bde6.png', 'PAID', '2026-03-04 08:58:15', NULL),
(12, 14, 'EXP-26', '2026-03-04', 1000.00, 'uploads/bills/1772614808_bd78787782603ed24e6b.png', 'UNPAID', '2026-03-04 09:00:08', NULL),
(13, 13, 'EXP-27', '2026-02-03', 10000.00, 'uploads/bills/1772614934_91a127e888783e86d73e.pdf', 'UNPAID', '2026-03-04 09:02:14', NULL),
(14, 14, 'EXP-28', '2026-02-09', 6000.00, 'uploads/bills/1773037373_17bec18dc2ea9be6e565.png', 'PAID', '2026-03-09 06:22:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `expense_id` int(11) UNSIGNED NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `category` varchar(100) NOT NULL,
  `expense_date` date NOT NULL,
  `description` text DEFAULT NULL,
  `bill_file` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`expense_id`, `vendor_id`, `amount`, `category`, `expense_date`, `description`, `bill_file`, `created_at`) VALUES
(25, 13, 500.00, 'Maintenance', '2026-03-04', 'Cleaning', 'uploads/bills/1772614695_888952c2dc0955a2bde6.png', '2026-03-04 08:58:15'),
(26, 14, 1000.00, 'Food & Refreshments', '2026-03-04', 'Food', 'uploads/bills/1772614808_bd78787782603ed24e6b.png', '2026-03-04 09:00:08'),
(27, 13, 10000.00, 'Salaries', '2026-02-03', 'staff salaries', 'uploads/bills/1772614934_91a127e888783e86d73e.pdf', '2026-03-04 09:02:14'),
(28, 14, 6000.00, 'Salaries', '2026-02-09', 'Employee Salary', 'uploads/bills/1773037373_17bec18dc2ea9be6e565.png', '2026-03-09 06:22:54');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `invoice_id` int(11) UNSIGNED NOT NULL,
  `bill_id` int(11) UNSIGNED NOT NULL,
  `invoice_number` varchar(100) DEFAULT NULL,
  `invoice_date` date NOT NULL,
  `invoice_amount` decimal(12,2) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'open',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ledger`
--

CREATE TABLE `ledger` (
  `ledger_id` int(11) UNSIGNED NOT NULL,
  `reference_type` varchar(50) NOT NULL,
  `reference_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `debit` decimal(10,2) NOT NULL DEFAULT 0.00,
  `credit` decimal(10,2) NOT NULL DEFAULT 0.00,
  `entry_date` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ledger`
--

INSERT INTO `ledger` (`ledger_id`, `reference_type`, `reference_id`, `vendor_id`, `debit`, `credit`, `entry_date`, `created_at`) VALUES
(23, 'Expense', 25, 13, 500.00, 0.00, '2026-03-04', NULL),
(24, 'Payment', 22, NULL, 0.00, 500.00, '2026-03-04', NULL),
(25, 'Expense', 26, 14, 1000.00, 0.00, '2026-03-04', NULL),
(26, 'Expense', 27, 13, 10000.00, 0.00, '2026-02-03', NULL),
(27, 'Expense', 28, 14, 6000.00, 0.00, '2026-02-09', NULL),
(28, 'Payment', 23, NULL, 0.00, 6000.00, '2026-02-09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ledgers`
--

CREATE TABLE `ledgers` (
  `ledger_id` int(11) UNSIGNED NOT NULL,
  `reference_type` varchar(50) NOT NULL,
  `reference_id` int(11) UNSIGNED NOT NULL,
  `vendor_id` int(11) UNSIGNED NOT NULL,
  `debit` decimal(12,2) NOT NULL DEFAULT 0.00,
  `credit` decimal(12,2) NOT NULL DEFAULT 0.00,
  `entry_date` date NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `version` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `namespace` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `batch` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) UNSIGNED NOT NULL,
  `bill_id` int(11) UNSIGNED NOT NULL,
  `payment_date` date NOT NULL,
  `amount_paid` decimal(12,2) NOT NULL,
  `payment_mode` enum('Cash','Cheque','NEFT','UPI') NOT NULL,
  `reference_no` varchar(100) DEFAULT NULL,
  `instrument_file` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `bill_id`, `payment_date`, `amount_paid`, `payment_mode`, `reference_no`, `instrument_file`, `created_at`, `updated_at`) VALUES
(22, 11, '2026-03-04', 500.00, 'Cheque', '1122334455', NULL, '2026-03-04 08:58:55', NULL),
(23, 14, '2026-02-09', 6000.00, 'Cash', NULL, NULL, '2026-03-09 06:23:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'User',
  `token` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expires_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`, `token`, `reset_token`, `reset_token_expires_at`, `created_at`, `updated_at`) VALUES
(1, 'Boss', 'admin@test.com', '$2y$10$b1RaJLmd2/1ZLdkrj/88fO3LoeN4HxF0Fq.Fchde1sCVJQ.8Uam0G', 'Admin', 'ec8bc57cb26549502cc6af5b011a913bc3d2ee5f0363f31d615d36862fe02355', 'f06ac19646c4bc7b7d18cd001d617ce08c525a7b9cc7de700cb4ea4e77459a4a', '2026-04-09 15:33:59', NULL, NULL),
(2, 'Acc1', 'accountant@test.com', '$2y$10$htCukhZNkW/B6FB0z0c6h.0EXxRjYiUKgzav9dFsg.qJdu4uqIjtS', 'Accountant', 'b9538835dd82ee683f89563c06bec43b007abc2ff9db34f5fcbfb244f149ce59', NULL, NULL, NULL, NULL),
(3, 'Spectate', 'viewer@test.com', '$2y$10$GHB67hDqDlqbBp8xLrGvaODn7UP9Ek184uiHJThPk6rxFR8SUl33.', 'Viewer', '8e01981095490f5e1093f5afcedf4a24a24b99080ea0aac83262f3129c72195b', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `vendor_id` int(11) UNSIGNED NOT NULL,
  `vendor_name` varchar(100) NOT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`vendor_id`, `vendor_name`, `contact_person`, `phone`, `email`, `logo`, `created_at`, `updated_at`) VALUES
(13, 'ABC Suppliers', 'John', '1122334455', 'admin@test.com', 'uploads/vendor_logos/1772614510_eece9b2847b983b619c8.png', NULL, NULL),
(14, 'XYZ ', '', '', '', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`bill_id`),
  ADD KEY `idx_vendor_id` (`vendor_id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`expense_id`),
  ADD KEY `idx_vendor_id` (`vendor_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `invoices_bill_id_foreign` (`bill_id`);

--
-- Indexes for table `ledger`
--
ALTER TABLE `ledger`
  ADD PRIMARY KEY (`ledger_id`);

--
-- Indexes for table `ledgers`
--
ALTER TABLE `ledgers`
  ADD PRIMARY KEY (`ledger_id`),
  ADD KEY `ledgers_vendor_id_foreign` (`vendor_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `payments_bill_id_foreign` (`bill_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_token` (`token`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`vendor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `bill_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `expense_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `invoice_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ledger`
--
ALTER TABLE `ledger`
  MODIFY `ledger_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `ledgers`
--
ALTER TABLE `ledgers`
  MODIFY `ledger_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `vendor_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_vendor_id_foreign` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_bill_id_foreign` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ledgers`
--
ALTER TABLE `ledgers`
  ADD CONSTRAINT `ledgers_vendor_id_foreign` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_bill_id_foreign` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

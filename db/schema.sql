-- Create users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_tutor` int(1) NOT NULL DEFAULT '0'
);

-- Create OTPs table
CREATE TABLE IF NOT EXISTS `otps` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expires_at` timestamp NOT NULL,
  `used` tinyint(1) DEFAULT '0',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table for NextAuth
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) NOT NULL PRIMARY KEY,
  `session_token` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `expires` timestamp(6) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create user_wallets table for coin balance
CREATE TABLE IF NOT EXISTS `user_wallets` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` bigint(20) NOT NULL UNIQUE,
  `coin_balance` decimal(15,2) DEFAULT '0.00',
  `total_coins_purchased` decimal(15,2) DEFAULT '0.00',
  `total_coins_spent` decimal(15,2) DEFAULT '0.00',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create coin_transactions table for all coin-related transactions
CREATE TABLE IF NOT EXISTS `coin_transactions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` bigint(20) NOT NULL,
  `transaction_type` enum('purchase','spend','coupon_redeem','refund','bonus') NOT NULL,
  `coins_amount` decimal(15,2) NOT NULL,
  `usd_amount` decimal(10,2) DEFAULT NULL,
  `currency` varchar(3) DEFAULT 'USD',
  `exchange_rate` decimal(10,6) DEFAULT NULL,
  `razorpay_payment_id` varchar(255) DEFAULT NULL,
  `razorpay_order_id` varchar(255) DEFAULT NULL,
  `status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
  `description` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
); 

-- Ensure payment idempotency on coin transactions
ALTER TABLE `coin_transactions`
  ADD UNIQUE KEY `uq_coin_tx_rzp_payment` (`razorpay_payment_id`);

-- Create coupons table
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `code` varchar(50) NOT NULL,
  `coin_amount` decimal(15,2) NOT NULL,
  `max_uses` int(11) DEFAULT '1',
  `current_uses` int(11) DEFAULT '0',
  `valid_from` timestamp DEFAULT CURRENT_TIMESTAMP,
  `valid_until` timestamp DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Create coupon_redemptions table
CREATE TABLE IF NOT EXISTS `coupon_redemptions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `coupon_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `coins_received` decimal(15,2) NOT NULL,
  `redeemed_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
); 

-- Create exchange_rates_cache table
CREATE TABLE IF NOT EXISTS `exchange_rates_cache` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `currency` varchar(3) NOT NULL,
  `rate_to_usd` decimal(10,6) NOT NULL,
  `last_updated` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create user_applications table
CREATE TABLE IF NOT EXISTS `user_applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `application_date` datetime DEFAULT NULL,
  `is_paid` tinyint(1) DEFAULT '0',
  `amount_paid` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','selected','rejected','refunded') DEFAULT NULL,
  `created_at` timestamp DEFAULT NULL
);

-- Create job_payments table
CREATE TABLE IF NOT EXISTS `job_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `type` enum('application_fee','success_fee','refund') DEFAULT NULL,
  `status` enum('pending','completed','failed') DEFAULT NULL,
  `platform_fee` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp DEFAULT NULL
);

-- Create job_completions table
CREATE TABLE IF NOT EXISTS `job_completions` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `job_id` int(11) DEFAULT NULL,
  `selected_tutor_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `platform_fee` decimal(10,2) DEFAULT NULL,
  `tutor_amount` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','completed','cancelled') DEFAULT NULL,
  `created_at` timestamp DEFAULT NULL
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `title` varchar(128) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
);

-- Create tutor_info table
CREATE TABLE IF NOT EXISTS `tutor_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `profile_pic_url` varchar(255) DEFAULT NULL,
  `profile_tag_line` varchar(200) DEFAULT NULL,
  `profile_desc` text DEFAULT NULL,
  `intro_video_url` text DEFAULT NULL,
  `street_add` text DEFAULT NULL,
  `state` varchar(300) DEFAULT NULL,
  `city` varchar(300) DEFAULT NULL,
  `fee_max` varchar(300) DEFAULT NULL,
  `fee_min` varchar(300) DEFAULT NULL,
  `fee_charged_for` varchar(100) DEFAULT NULL,
  `fee_details` text DEFAULT NULL,
  `tutoring_preferences` varchar(600) NOT NULL,
  `language_preferences` text DEFAULT NULL,
  `travel_distance` int(11) DEFAULT NULL,
  `can_do_assignmnet` varchar(50) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `tutor_id` varchar(50) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` timestamp DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  `is_verified` tinyint(1) DEFAULT '0',
  `account_status` varchar(50) DEFAULT 'pending',
  `total_exp_yrs` varchar(10) NOT NULL,
  `online_exp` varchar(10) NOT NULL,
  `total_online_exp_yrs` varchar(10) NOT NULL
);

-- Create tutor_skills table
CREATE TABLE IF NOT EXISTS `tutor_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` varchar(10) NOT NULL,
  `skill_name` varchar(200) DEFAULT NULL,
  `from_level` varchar(200) DEFAULT NULL,
  `to_level` varchar(200) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Create tutor_education table
CREATE TABLE IF NOT EXISTS `tutor_education` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` varchar(10) NOT NULL,
  `degree_name` varchar(200) DEFAULT NULL,
  `speciality` varchar(300) DEFAULT NULL,
  `university` varchar(300) DEFAULT NULL,
  `end_year` varchar(200) DEFAULT NULL,
  `score` varchar(200) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Create tutor_experience table
CREATE TABLE IF NOT EXISTS `tutor_experience` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` varchar(12) NOT NULL,
  `company` varchar(150) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `start_month` varchar(100) DEFAULT NULL,
  `start_year` varchar(20) DEFAULT NULL,
  `end_month` varchar(100) DEFAULT NULL,
  `end_year` varchar(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `association` varchar(200) NOT NULL
);

-- Create tutor_requests table
CREATE TABLE IF NOT EXISTS `tutor_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `location` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `requirement_details` text DEFAULT NULL,
  `subjects` varchar(500) NOT NULL,
  `student_level` varchar(100) NOT NULL,
  `tutoring_type` varchar(500) NOT NULL,
  `meeting_preferences` varchar(255) DEFAULT NULL,
  `travel_distance` int(11) DEFAULT NULL,
  `budget` decimal(10,2) DEFAULT NULL,
  `gender_preference` enum('Male','Female','No preference') DEFAULT 'No preference',
  `time_preference` varchar(255) DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `attachment_urls` text DEFAULT NULL,
  `status` enum('pending','in-progress','accepted','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `request_id` varchar(10) NOT NULL,
  `state` varchar(300) NOT NULL,
  `city` varchar(300) NOT NULL,
  `url` varchar(400) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(300) NOT NULL
);

-- Create recent_logs table
CREATE TABLE IF NOT EXISTS `recent_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) DEFAULT NULL,
  `action_type` varchar(32) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `related_id` int(11) DEFAULT NULL,
  `related_table` varchar(32) DEFAULT NULL,
  `log_message` text DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample exchange rates
INSERT INTO `exchange_rates_cache` (`currency`, `rate_to_usd`) VALUES 
('USD', 1.000000),
('INR', 83.000000)
ON DUPLICATE KEY UPDATE `rate_to_usd` = VALUES(`rate_to_usd`);

-- Insert sample coupons
INSERT INTO `coupons` (`code`, `coin_amount`, `max_uses`, `is_active`) VALUES 
('WELCOME200', 200.00, 1000, 1),
('BONUS500', 500.00, 500, 1)
ON DUPLICATE KEY UPDATE `coin_amount` = VALUES(`coin_amount`);

-- Create coin packages table
CREATE TABLE IF NOT EXISTS `coin_packages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `coins` int(11) NOT NULL,
  `usd_price` decimal(10,2) NOT NULL,
  `discount_pct` int(11) NOT NULL DEFAULT 0,
  `is_popular` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uniq_coins_active` (`coins`)
);

-- Seed coin packages
INSERT INTO `coin_packages` (`coins`, `usd_price`, `discount_pct`, `is_popular`, `is_active`) VALUES
(100, 1.00, 0, 0, 1)
ON DUPLICATE KEY UPDATE `usd_price`=VALUES(`usd_price`), `discount_pct`=VALUES(`discount_pct`), `is_popular`=VALUES(`is_popular`), `is_active`=VALUES(`is_active`);

-- Orders table for coin purchases (idempotent with unique rzp_order_id)
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` bigint(20) NOT NULL,
  `package_id` bigint(20) NOT NULL,
  `rzp_order_id` varchar(255) NOT NULL,
  `expected_currency` varchar(3) NOT NULL,
  `expected_usd_price` decimal(10,2) NOT NULL,
  `expected_exchange_rate` decimal(10,6) NOT NULL,
  `expected_minor_amount` bigint(20) NOT NULL,
  `expected_coins` int(11) NOT NULL,
  `status` enum('created','paid','failed','cancelled') NOT NULL DEFAULT 'created',
  `meta` json DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uq_orders_rzp_order` (`rzp_order_id`),
  KEY `idx_orders_user` (`user_id`),
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

INSERT INTO `coin_packages` (`coins`, `usd_price`, `discount_pct`, `is_popular`, `is_active`) VALUES
(500, 5.00, 2, 1, 1)
ON DUPLICATE KEY UPDATE `usd_price`=VALUES(`usd_price`), `discount_pct`=VALUES(`discount_pct`), `is_popular`=VALUES(`is_popular`), `is_active`=VALUES(`is_active`);

INSERT INTO `coin_packages` (`coins`, `usd_price`, `discount_pct`, `is_popular`, `is_active`) VALUES
(1000, 10.00, 4, 0, 1)
ON DUPLICATE KEY UPDATE `usd_price`=VALUES(`usd_price`), `discount_pct`=VALUES(`discount_pct`), `is_popular`=VALUES(`is_popular`), `is_active`=VALUES(`is_active`);

INSERT INTO `coin_packages` (`coins`, `usd_price`, `discount_pct`, `is_popular`, `is_active`) VALUES
(2500, 25.00, 6, 0, 1)
ON DUPLICATE KEY UPDATE `usd_price`=VALUES(`usd_price`), `discount_pct`=VALUES(`discount_pct`), `is_popular`=VALUES(`is_popular`), `is_active`=VALUES(`is_active`);

INSERT INTO `coin_packages` (`coins`, `usd_price`, `discount_pct`, `is_popular`, `is_active`) VALUES
(5000, 50.00, 8, 1, 1)
ON DUPLICATE KEY UPDATE `usd_price`=VALUES(`usd_price`), `discount_pct`=VALUES(`discount_pct`), `is_popular`=VALUES(`is_popular`), `is_active`=VALUES(`is_active`);

-- Create contact_requests table for contact request system
CREATE TABLE IF NOT EXISTS `contact_requests` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `job_id` int(11) NOT NULL,
  `requester_id` bigint(20) NOT NULL,
  `job_poster_id` bigint(20) NOT NULL,
  `status` enum('pending','approved','rejected','expired') DEFAULT 'pending',
  `coins_spent` decimal(15,2) DEFAULT 50.00,
  `transaction_id` bigint(20) DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `rejected_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NOT NULL,
  `refund_status` enum('none','partial','full') DEFAULT 'none',
  `refund_amount` decimal(15,2) DEFAULT 0.00,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`job_id`) REFERENCES `tutor_requests`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`requester_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`job_poster_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`transaction_id`) REFERENCES `coin_transactions`(`id`) ON DELETE SET NULL
);

-- Update coin_transactions table to link with contact requests
ALTER TABLE `coin_transactions` 
ADD COLUMN `contact_request_id` bigint(20) DEFAULT NULL,
ADD FOREIGN KEY (`contact_request_id`) REFERENCES `contact_requests`(`id`) ON DELETE SET NULL;

-- Fix duplicate user_wallets issue
-- First, merge duplicate wallets by user_id
UPDATE user_wallets uw1
JOIN (
    SELECT 
        user_id,
        SUM(coin_balance) as total_balance,
        SUM(total_coins_purchased) as total_purchased,
        SUM(total_coins_spent) as total_spent,
        MIN(created_at) as earliest_created,
        MAX(updated_at) as latest_updated
    FROM user_wallets 
    GROUP BY user_id 
    HAVING COUNT(*) > 1
) uw2 ON uw1.user_id = uw2.user_id
SET 
    uw1.coin_balance = uw2.total_balance,
    uw1.total_coins_purchased = uw2.total_purchased,
    uw1.total_coins_spent = uw2.total_spent,
    uw1.created_at = uw2.earliest_created,
    uw1.updated_at = uw2.latest_updated
WHERE uw1.id = (
    SELECT MIN(id) FROM user_wallets uw3 
    WHERE uw3.user_id = uw1.user_id
);

-- Delete duplicate wallet records (keep only the first one for each user)
DELETE uw1 FROM user_wallets uw1
INNER JOIN user_wallets uw2 
WHERE uw1.id > uw2.id AND uw1.user_id = uw2.user_id;

-- Add unique constraint to prevent future duplicates
ALTER TABLE `user_wallets` ADD UNIQUE KEY `unique_user_id` (`user_id`);
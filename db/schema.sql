-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(45),
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create OTPs table
CREATE TABLE IF NOT EXISTS otps (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drop existing sessions table if exists
DROP TABLE IF EXISTS sessions;

-- Create sessions table for NextAuth
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  user_id BIGINT NOT NULL,
  expires TIMESTAMP(6) NOT NULL,
  access_token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
); 




-- User subscription/usage tracking
CREATE TABLE user_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    job_id INT,
    application_date DATETIME,
    is_paid BOOLEAN DEFAULT FALSE,
    amount_paid DECIMAL(10,2),
    status ENUM('pending', 'selected', 'rejected', 'refunded'),
    created_at TIMESTAMP
);

-- Payment transactions
CREATE TABLE job_payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    job_id INT,
    amount DECIMAL(10,2),
    type ENUM('application_fee', 'success_fee', 'refund'),
    status ENUM('pending', 'completed', 'failed'),
    platform_fee DECIMAL(10,2),
    created_at TIMESTAMP
);

-- Job completion tracking
CREATE TABLE job_completions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT,
    selected_tutor_id INT,
    total_amount DECIMAL(10,2),
    platform_fee DECIMAL(10,2),
    tutor_amount DECIMAL(10,2),
    status ENUM('pending', 'completed', 'cancelled'),
    created_at TIMESTAMP
);



CREATE TABLE recent_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,                -- Who performed the action (nullable for system actions)
    action_type VARCHAR(32),    -- e.g. 'add_job', 'delete_job', 'update_profile', 'apply', 'accept', 'reject', 'payment'
    summary TEXT,               -- Human-readable summary, e.g. "User applied for Job #123"
    related_id INT,             -- (Optional) e.g. job_id, application_id, payment_id, etc.
    related_table VARCHAR(32),  -- (Optional) e.g. 'jobs', 'applications', 'payments'
    log_message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


const USER_MESSAGES = {
  save_post: "You saved a post.",
  delete_post: "You deleted a post.",
  add_job: "Your job has been posted successfully.",
  update_job: "Your job has been updated.",
  delete_job: "Your job has been deleted.",
  apply: "Your application has been submitted.",
  accept: "Your application was accepted!",
  reject: "Your application was rejected.",
  payment: "Your payment was successful.",
  refund: "Your refund has been processed.",
  update_profile: "Your profile has been updated.",
  unlock_contact: "You unlocked contact details.",
  reach_limit: "You have reached your free application limit for this month.",
  admin_grant_free: "You have been granted lifetime free access by admin.",
  job_live: "Your job is now live!",
  job_pending: "Your job will go live soon.",
  job_expired: "Your job has expired.",
  withdraw_earnings: "Your withdrawal request has been submitted.",
  review_submitted: "Your review has been submitted.",
  assignment_help: "You have requested assignment help.",
  assignment_accepted: "Your assignment help request was accepted.",
  assignment_rejected: "Your assignment help request was rejected."
};

CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT, -- NULL for broadcast/all users
    type VARCHAR(32), -- e.g. 'new_job'
    title VARCHAR(128),
    message TEXT,
    link VARCHAR(255), -- e.g. '/tutor-jobs/123'
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
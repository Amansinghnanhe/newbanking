CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  gender ENUM('Male','Female','Other') NOT NULL,
  dob DATE NOT NULL,
  mobile VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  house VARCHAR(100),
  street VARCHAR(100),
  city VARCHAR(50),
  state VARCHAR(50),
  pincode VARCHAR(10),
  address_type ENUM('current','permanent'),
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS kyc_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  document_name VARCHAR(50),
  document_number VARCHAR(50),
  issuing_authority VARCHAR(100),
  expiry_date DATE NULL,
  file_path VARCHAR(255),
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS referral_sources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  referral_type VARCHAR(50),
  description TEXT
);

CREATE TABLE IF NOT EXISTS onboarding_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  request_date DATE,
  source VARCHAR(100),
  preferred_branch VARCHAR(100),
  staff_notes TEXT,
  referral_source_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (referral_source_id) REFERENCES referral_sources(id)
);

CREATE TABLE IF NOT EXISTS branches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  branch_name VARCHAR(100),
  city VARCHAR(50),
  state VARCHAR(50),
  ifsc_code VARCHAR(20) UNIQUE
);

CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100),
  designation VARCHAR(50),
  contact_number VARCHAR(15),
  email VARCHAR(100),
  branch
);

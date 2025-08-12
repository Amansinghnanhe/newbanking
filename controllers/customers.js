const pool = require('../config/db');

exports.createOnboardingRequest = async (req, res) => {
  const {
    fullName, gender, dob, mobile, email,
    addresses, kycDocuments, onboardingRequest, referralSource
  } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [customerResult] = await conn.query(
      `INSERT INTO customers (full_name, gender, date_of_birth, mobile_number, email_address)
      VALUES (?, ?, ?, ?, ?)`,
      [fullName, gender, dob, mobile, email]
    );
    const customerId = customerResult.insertId;

    for (const addr of addresses) {
      await conn.query(
        `INSERT INTO addresses (customer_id, house_number, street_name, city, state, pincode, address_type)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [customerId, addr.houseNumber, addr.streetName, addr.city, addr.state, addr.pincode, addr.addressType]
      );
    }

    for (const doc of kycDocuments) {
      await conn.query(
        `INSERT INTO kyc_documents (customer_id, document_name, document_number, issuing_authority, expiry_date, file_path)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [customerId, doc.documentName, doc.documentNumber, doc.issuingAuthority, doc.expiryDate, doc.filePath]
      );
    }

    let referralSourceId = null;
    if (referralSource) {
      const [existing] = await conn.query(
        `SELECT id FROM referral_sources WHERE referral_type = ?`,
        [referralSource.referralType]
      );

      if (existing.length > 0) {
        referralSourceId = existing[0].id;
      } else {
        const [insertRef] = await conn.query(
          `INSERT INTO referral_sources (referral_type, description) VALUES (?, ?)`,
          [referralSource.referralType, referralSource.description]
        );
        referralSourceId = insertRef.insertId;
      }
    }

    await conn.query(
      `INSERT INTO onboarding_requests (customer_id, date_of_request, source_of_request, preferred_branch_location, notes, referral_source_id)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        customerId,
        onboardingRequest.dateOfRequest,
        onboardingRequest.sourceOfRequest,
        onboardingRequest.preferredBranchLocation,
        onboardingRequest.notes || null,
        referralSourceId
      ]
    );

    await conn.commit();
    res.status(201).json({ message: 'Customer onboarded successfully', customerId });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    conn.release();
  }
};

exports.getCustomerById = async (req, res) => {
  const customerId = req.params.id;
  try {
    const [customers] = await pool.query(`SELECT * FROM customers WHERE id = ?`, [customerId]);
    if (customers.length === 0) return res.status(404).json({ message: 'Customer not found' });

    const [addresses] = await pool.query(`SELECT * FROM addresses WHERE customer_id = ?`, [customerId]);
    const [kycDocuments] = await pool.query(`SELECT * FROM kyc_documents WHERE customer_id = ?`, [customerId]);
    const [onboardingRequests] = await pool.query(`SELECT * FROM onboarding_requests WHERE customer_id = ?`, [customerId]);

    res.json({
      customer: customers[0],
      addresses,
      kycDocuments,
      onboardingRequests
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

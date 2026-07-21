/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import { ConfigFile } from '../../config';

const formatPhoneNumber = (phone: string): string => {
  if (!phone) {
    throw new Error('Phone number is required');
  }

  // Remove everything except digits and "+"
  let formatted = phone.replace(/[^\d+]/g, '').trim();

  // Case 1: Starts with +88 → remove "+"
  if (formatted.startsWith('+88')) {
    formatted = formatted.substring(1);
  }
  // Case 2: Starts with 01 → add "88" in front
  else if (formatted.startsWith('01')) {
    formatted = '88' + formatted;
  }

  // Validate final format → must look like 8801XXXXXXXXX
  if (!/^8801\d{8,9}$/.test(formatted)) {
    throw new Error(`Invalid phone number format: ${phone}`);
  }

  return formatted;
};

///

const phoneOtpSend = async (phone: string, message: string) => {
  try {
    const url = 'https://smsplus.sslwireless.com/api/v3/send-sms';

    // ✅ Format phone number before sending
    const formattedPhone = formatPhoneNumber(phone);

    const payload = {
      api_token: ConfigFile.SSL_SMS_API_TOKEN, // Your API token
      sid: ConfigFile.SSL_SMS_SID, // Sender ID
      msisdn: formattedPhone, // Receiver number
      sms: message, // Message text
      csms_id: Math.random().toString(36).substring(2, 12), // Unique ID
    };

    const res = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (error: any) {
    console.error('SMS send failed:', error.response?.data || error.message);
    throw new Error('SMS sending failed');
  }
};

export default phoneOtpSend;

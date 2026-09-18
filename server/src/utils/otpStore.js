
const otpStore = new Map();

export const saveOTP = (email, otp) => {
    otpStore.set(email, {
        otp,
        expiresAt: Date.now() + 2 * 60 * 1000 
    });
};

export const verifyOTP = (email, otp) => {
    const record = otpStore.get(email);
    
    if (!record) return "NOT_FOUND";
    
    if (Date.now() > record.expiresAt) {
        otpStore.delete(email); // clean up expired
        return "EXPIRED";
    }
    
    if (record.otp !== otp) return "INVALID";
    
    otpStore.delete(email); // clean up after success
    return "VALID";
};
const GenerateOtp = ()=>{
    const otp = Math.floor(Math.random() * 900000) + 100000
    otpExpiry = Date.now() + 5 * 60 * 1000; 
    console.log(otp);
    
    return otp
}



module.exports = GenerateOtp
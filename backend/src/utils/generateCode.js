const generateQuizCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return code;
};

const generateUniqueCode = async (Model) => {
  let code;
  let exists = true;
  
  while (exists) {
    code = generateQuizCode();
    const doc = await Model.findOne({ code });
    if (!doc) {
      exists = false;
    }
  }
  
  return code;
};

module.exports = { generateQuizCode, generateUniqueCode };

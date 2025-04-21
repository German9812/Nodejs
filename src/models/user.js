class UserModel {
    static validateCreateData(userData) {
      const { name, email } = userData;
      const errors = [];
  
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('El nombre es requerido y debe ser una cadena válida');
      }
  
      if (!email || typeof email !== 'string' || !this.validateEmail(email)) {
        errors.push('El email es requerido y debe tener un formato válido');
      }
  
      return {
        isValid: errors.length === 0,
        errors
      };
    }
  
    static validateUpdateData(userData) {
      const { name, email } = userData;
      const errors = [];
  
      if (name && (typeof name !== 'string' || name.trim().length === 0)) {
        errors.push('El nombre debe ser una cadena válida');
      }
  
      if (email && (typeof email !== 'string' || !this.validateEmail(email))) {
        errors.push('El email debe tener un formato válido');
      }
  
      return {
        isValid: errors.length === 0,
        errors
      };
    }
  
    static validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  }
  
  module.exports = UserModel;
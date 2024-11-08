// src/utils/withExpiry.js

export const setWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };
  
  
  // Fonction pour récupérer une valeur du localStorage tout en vérifiant son expiration
export const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    
    // Si aucun item n'est trouvé, retourne null
    if (!itemStr) return null;
  
    const item = JSON.parse(itemStr);
    const now = new Date();
  
    // Vérifie si le temps actuel dépasse l'expiration
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key); // Si le token est expiré, supprime-le du localStorage
      return null;
    }
  
    // Si le token est encore valide, retourne la valeur
    return item.value;
  };
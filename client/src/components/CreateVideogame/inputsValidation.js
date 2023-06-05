const inputsValidation = (inputs) => {
  
  let errors = {};
  
  // ------- regex --------------
  const regexName = new RegExp(/^[A-Za-z0-9\s]+$/g);
  
  const regexReleased = new RegExp(/^\d{4}-\d{1,2}-\d{1,2}$/)
  
  // ------------------------------
  
  // ----------------- name ---------
  if (!regexName.test(inputs.name)) {
    errors.name = "El nombre no puede llevar caracteres especiales ($%&|<>#)";
  }

  if (!inputs.name) {
    errors.nameVacio = "Hay que escribir un nombre";
  }

  if (inputs.name.length > 150) {
    errors.nameCharacters = "Limite 150 characteres";
  }


  // ------------------- platforms --
  if (!(inputs.platforms === "PC") ) {
    errors.platforms = "Solamente puede ser PC";
  }

  // ------------------- released ---
  if (!regexReleased.test(inputs.released)) {
    errors.released = "Formato esperado: yyyy-mm-dd"
  }

  // ------------------- rating -----
  if (!(inputs.rating === "1")) {
    errors.rating = "Solamente puede ser 1, pues su juego recien fue creado"
  }

  // ------------------- description ---
  if (inputs.description.length < 10 || inputs.description.length > 500) {
    errors.description = "Minimo 10 characteres y maximo 500 characteres";
  }
  
  // ------------------- btn submit ----
  if (inputs.description.length < 10 )
    errors.inputsBtn = "El buton submit solamente aparecera cuando todos los campos estean aprobados"
  return errors;
}

export default inputsValidation;
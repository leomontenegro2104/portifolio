export function handleInputValueToBRL (e) {
  let value = e.target.value;
  value = Number(value.replace(/\D/g, ""));
  if (value === 0) {
    return "";
  }
  value = String(value).padStart(3, "0");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return e.target.value = `R$ ${value}`;
}

export function handleValueToBRL(value){
  value = String(value).replace(/\D/g, "").padStart(3, "0");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  const currencyBRL = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return `R$ ${currencyBRL}`;
}

export function handleBRLToValue (currencyBRL) {
  const value = currencyBRL.replace(/\D/g, "");
  return Number(value);
}

export function handleValueToCPF (value) {
  value = Number(String(value).replace(/\D/g, ""));
  value = value ? String(value).padStart(11, "0") : '';
  const cpf = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  return String(cpf);
}

export function handleCPFToValue (cpf) {
  cpf = String(cpf).replace(/\D/g, "");
  const value = cpf ? cpf.padStart(11, "0") : '';
  return String(value);
}

export function handleValueToPhone (value) {
  value = Number(String(value).replace(/\D/g, ""));
  value = String(value);
  let phone = value.length <= 10 
              ? value.replace(/(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") 
              : value.replace(/(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  return String(phone);
}

export function handlePhoneToValue (phone) {
  phone = String(phone).replace(/\D/g, "");
  const value = phone.padStart(11, "0");
  return Number(value);
}
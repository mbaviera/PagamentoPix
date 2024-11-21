import { brandLogos } from "../constants/Brands";

export function getBrandLogo(brandName) {
  const normalizedBrandName = brandName?.trim().toLowerCase();
  const brand = brandLogos.find(
    (data) => data.name.toLowerCase() === normalizedBrandName
  );
  return brand ? brand.img : null; // Retorna a imagem ou null
}

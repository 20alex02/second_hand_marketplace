const formatPrice = (price?: number) =>
  price ? `${price.toLocaleString('cs-CZ')} CZK` : 'Negotiable';

export default {
  formatPrice,
};

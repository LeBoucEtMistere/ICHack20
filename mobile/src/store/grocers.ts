const getGrocerImage = (grocerName: String) => {
  switch (grocerName.toLowerCase()) {
    case 'tesco':
      return 'https://cdn.images.express.co.uk/img/dynamic/22/590x/tesco-jobs-822278.jpg';
    case 'waitrose':
      return 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.retailgazette.co.uk%2Fwp%2Fwp-content%2Fuploads%2FWaitrose_grocery_shopfront_ST-3.jpg&f=1&nofb=1';
    case 'sainburys':
    case "sainbury's":
      return 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.telegraph.co.uk%2Fmultimedia%2Farchive%2F02604%2FSainsburys_2604761b.jpg&f=1&nofb=1';
    default:
      return 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fa0.muscache.com%2Fairbnb%2Fguidebook%2Fv1_grocery_store_hero%402x.jpg&f=1&nofb=1';
  }
};

export default getGrocerImage;

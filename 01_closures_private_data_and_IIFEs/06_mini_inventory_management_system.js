/**
 * Darren Churchill
 *
 * Launch School Exercises
 * JS120 - JavaScript Exercises
 * Closures, Private Data, and IIFEs
 *
 * Mini Inventory Management System
 *
 * https://launchschool.com/exercises/d30df1f2
 */
"use strict";

class Item {
  constructor(skuCode, itemName, category, quantity) {
    this.skuCode = skuCode;
    this.itemName = itemName;
    this.category = category;
    this.quantity = quantity;
  }
}

class InvalidItem {
  constructor() {
    this.notValid = true;
  }
}

const itemCreator = {
  itemNameMinLength: 5,
  itemCategoryMinLength: 5,

  /**
   *
   * @param {string} itemName the item name (min `itemCategoryMinLength`
   * letters, not including spaces)
   * @param {string} itemCategory the item category (min `itemCategoryMinLength`
   * letters, must be 1 word)
   * @param {number} itemQuantity the item quantity (a valid integer >= 0)
   * @returns {(Item|InvalidItem)} the `Item` or `InvalidItem` created
   */
  create(itemName, itemCategory, itemQuantity) {
    if (
      this.isValidItemName(itemName) &&
      this.isValidItemCategory(itemCategory) &&
      this.isValidItemQuantity(itemQuantity)
    ) {
      return new Item(
        this.createSKU(itemName, itemCategory),
        itemName,
        itemCategory,
        itemQuantity
      );
    }
    return new InvalidItem();
  },

  /**
   * Return `true` if the `itemName` is valid. Valid item names are at minimum
   * `itemNameMinLength` letters long, not including spaces.
   * @param {string} itemName the item name to validate
   * @returns {boolean} `true` if the `itemName` is valid
   */
  isValidItemName(itemName) {
    return itemName.split(" ").join("").length >= this.itemNameMinLength;
  },

  /**
   * Return `true` if the `itemCategory` is valid. Valid category names are 1
   * word and at minimum `ITEM_CATEGORY_MIN_LENGTH` characters long.
   * @param {string} itemCategory the item category to validate
   * @returns {boolean} `true` if the `itemCategory` is valid
   */
  isValidItemCategory(itemCategory) {
    return (
      itemCategory.length >= this.itemCategoryMinLength &&
      !itemCategory.includes(" ")
    );
  },

  /**
   * Return `true` if the `itemQuantity` is valid. Valid item quantities are
   * integer values greater than or equal to `0`.
   * @param {number} itemQuantity the item quantity to validate
   * @returns `true` if the `itemQuantity` is valid
   */
  isValidItemQuantity(itemQuantity) {
    return Number.isInteger(itemQuantity) && itemQuantity >= 0;
  },

  // TODO: should createSKU() be here, or in ItemManager?
  // As is, either:
  // - ItemManager also has to know that SKUs are stored uppercase
  // OR
  // - SKUs not given in uppercase won't be found
  // UPDATE:
  // - if you the ItemManager transforms item SKUs AND input SKUs, you can avoid
  // this problem
  createSKU(itemName, itemCategory) {
    const NAME_NUM_CHARS = 3;
    const CAT_NUM_CHARS = 2;

    return (
      itemName.split(" ").join("").slice(0, NAME_NUM_CHARS) +
      itemCategory.slice(0, CAT_NUM_CHARS)
    ).toUpperCase();
  },
};

class ItemManager {
  constructor() {
    this.itemCreator = itemCreator;
    /** @type {Array.<Item>} */
    this.items = [];
  }

  /**
   * Create a new item and add it to this `ItemManagers` `items` list. Returns
   * `true` if the provided arguments are all valid and an item is
   * created/added.
   * @param {string} itemName the item name
   * @param {string} itemCategory the item category
   * @param {number} itemQuantity the item quantity
   * @returns {boolean} `true` if an item is created
   */
  create(itemName, itemCategory, itemQuantity) {
    let item = this.itemCreator.create(itemName, itemCategory, itemQuantity);
    if (item.notValid) return false;
    this.items.push(item);
    return true;
  }

  /**
   * Given a **valid** `skuCode`, update the item with that `skuCode` using the
   * provided object's **valid** properties.
   * @param {string} skuCode the item's SKU
   * @param {object} itemInfoObj an object containing the valid properties and
   * keys to update the item with
   */
  update(skuCode, itemInfoObj) {
    Object.assign(this.get(skuCode), itemInfoObj);
  }

  /**
   * Given a **valid** `skuCode`, delete the item with that `skuCode` from this
   * `ItemManager`'s list.
   * @param {string} skuCode the item's SKU
   */
  delete(skuCode) {
    skuCode = skuCode.toUpperCase();
    let index = this.items.findIndex(
      (item) => item.skuCode.toUpperCase() === skuCode
    );

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  /**
   * Given a **valid** `skuCode`, return the item with that `skuCode`.
   * @param {string} skuCode the item's SKU
   * @returns {Item} the item with the given SKU
   */
  get(skuCode) {
    skuCode = skuCode.toUpperCase();
    return this.items.find((item) => item.skuCode.toUpperCase() === skuCode);
  }

  /**
   * Return an array of the in-stock items, whose `quantity` is greater than
   * `0`.
   * @returns {Array.<Item>} the array of in-stock items
   */
  inStock() {
    return this.items.filter((item) => item.quantity > 0);
  }

  /**
   * Return an array of items in a given category.
   * @param {string} itemCategory the item category to filter on
   * @returns {Array.<Item>} the array of items in this category
   */
  itemsInCategory(itemCategory) {
    return this.items.filter((item) => item.category === itemCategory);
  }
}

class ReportManager {
  constructor() {
    this.itemManager = null;
  }

  // This could be in the constructor, but the exercise requirements specify the
  // `init()` method. Using the OLOO pattern would be another option to satisfy
  // the requirement without an additional constructor function.
  init(itemManager) {
    this.itemManager = itemManager;
  }

  /**
   * Given a **valid** `skuCode`, return a reporter object with a single method,
   * `itemInfo()`, that logs the item's current information to the console.
   * The reporter object maintains reference to the item, so it reflects the
   * item's current information, even if the item is modified later.
   * @param {string} skuCode the item's SKU
   * @returns {object} the reporter object with an `itemInfo()` method
   */
  createReporter(skuCode) {
    let itemManager = this.itemManager;

    return {
      itemInfo() {
        Object.entries(itemManager.get(skuCode)).forEach(
          ([itemProp, itemValue]) => console.log(`${itemProp}: ${itemValue}`)
        );
      },
    };
  }

  reportInStock() {
    console.log(
      this.itemManager
        .inStock()
        .map((item) => item.itemName)
        .join(", ")
    );
  }
}

let itemManager = new ItemManager();
let reportManager = new ReportManager();

console.log(itemManager.create("basket ball", "sports", 0) === true);   // valid item
console.log(itemManager.create("asd", "sports", 0) === false);
console.log(itemManager.create("soccer ball", "sports", 5) === true);   // valid item
console.log(itemManager.create("football", "sports") === false);
console.log(itemManager.create("football", "sports", 3) === true);      // valid item
console.log(itemManager.create("kitchen pot", "cooking items", 0) === false);
console.log(itemManager.create("kitchen pot", "cooking", 3) === true);  // valid item

console.log(itemManager.items); // returns => list with the 4 valid items

reportManager.init(itemManager);
reportManager.reportInStock(); // logs => soccer ball, football, kitchen pot

itemManager.update("SOCSP", { quantity: 0 });

// returns => list w/ item objs for football & kitchen pot
console.log(itemManager.inStock());

reportManager.reportInStock(); // logs => football, kitchen pot

// returns => list w/ item objs for basket ball, soccer ball, & football
console.log(itemManager.itemsInCategory("sports"));

itemManager.delete("SOCSP");

// returns => list w/ item objs for 3 valid items
// (soccer ball is removed from the list)
console.log(itemManager.items);

let kitchenPotReporter = reportManager.createReporter("KITCO");
kitchenPotReporter.itemInfo();
// logs =>
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

itemManager.update("KITCO", { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs =>
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10

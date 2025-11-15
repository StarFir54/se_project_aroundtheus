export default class Section {
  constructor({ items, renderer }, cardSelector) {
    this._items = items; // This is an Array of Data, need to add to page on load
    this._renderer = renderer; //This is a function that creates and adds a single item to the page
    this._selector = cardSelector; // This is a CSS Class Selector for Card Elements
  }

  // Call this method once on page load
  renderItems() {
    //Use this._renderer to create the elements for rendering
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Call this method anytime you add a card to the DOM
  addItem(item) {
    //Take the item and render it into this._element
    this._selector.prepend(item);
  }
}

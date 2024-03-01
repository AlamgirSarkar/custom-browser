// Define the TabModel class to represent a browser tab with an ID and a URL
class TabModel {
    // Constructor to initialize a new instance of the TabModel with an ID and a URL
    constructor( id, url ) {
      this.id = id; // Store the tab ID
      this.url = url; // Store the tab URL
    }
  }
  // Define the TabView class to manage the UI representation of tabs
  class TabView {
    // Static method to create and append a new tab's HTML to the tabs container
    static createTab( tabId, url ) {
      // Create the HTML structure for a new tab and store it in tabHtml
      const tabHtml = $( `
              <div class="tab" id="tab${tabId}">
                  <input type="text" value="${url}">
              </div>
          ` );
      // Append the new tab's HTML to the tabs container
      $( '#tabs-container' ).append( tabHtml );
      // Create a close button for the tab and handle its click event
      const closeButton = $( '<span>', {
        class: 'close-tab', // Assign class for styling
        text: 'x' // Text displayed on the button
      } ).click( function( event ) {
        event.stopPropagation(); // Prevent event from bubbling up
        TabController.closeTab( tabId ); // Call closeTab method when clicked
      } );
      // Append the close button to the tabHtml
      tabHtml.append( closeButton );
      // Create the iframe HTML for the tab content and append it to the iframe container
      const iframeHtml = `<iframe src="${url}" class="iframe" id="iframe${tabId}"></iframe>`;
      $( '#iframe-container' ).append( iframeHtml );
      // Select the input element of the created tab
      const $input = $( `#tab${tabId} input` );
      // Add event listeners for input and keypress events on the tab's input field
      $input.on( 'input keypress', function( event ) {
        // Check if the keypress event is for the Enter key
        if ( event.type === 'keypress' && event.which === 13 ) {
          event.preventDefault(); // Prevent the default action
          const newUrl = $( this ).val(); // Get the new URL from the input field
          TabController.changeTabUrl( tabId, newUrl ); // Update the tab's URL
        }
      } );
      // Add a click event listener to the tab for setting it as active
      $( `#tab${tabId}` ).click( function() {
        TabController.setActiveTab( tabId ); // Call setActiveTab method when clicked
      } );
    }
    // Static method to close a tab and remove its HTML from the DOM
    static closeTab( tabId ) {
      $( `#tab${tabId}` ).remove(); // Remove the tab's HTML
      $( `#iframe${tabId}` ).remove(); // Remove the tab's iframe
      // Check if there are no more tabs open
      if ( $( '#tabs-container' ).children().length === 0 ) {
        $( '#iframe-container' ).empty(); // Clear the iframe container
      } else {
        // If there are other tabs, make the first one active
        $( '#tabs-container div:first-child' ).click();
      }
    }
    // Static method to set a tab as active by adding an 'active' class to its iframe
    static setActiveTab( tabId ) {
      $( '.iframe' ).removeClass( 'active' ); // Remove 'active' class from all iframes
      $( `#iframe${tabId}` ).addClass( 'active' ); // Add 'active' class to the selected tab's iframe
    }
  }
  // Define the TabController class to manage tab operations
  class TabController {
    static tabCounter = 0; // Static property to keep track of the number of tabs
    // Static method to add a new tab
    static addTab() {
      TabController.tabCounter++; // Increment the tab counter
      const defaultUrl = 'https://www.example.com'; // Set the default URL for new tabs
      const newTab = new TabModel( TabController.tabCounter, defaultUrl ); // Create a new TabModel instance
      TabView.createTab( newTab.id, newTab.url ); // Use TabView to create the tab in the UI
    }
    // Static method to close a tab
    static closeTab( tabId ) {
      TabView.closeTab( tabId ); // Call the TabView's closeTab method
    }
    // Static method to change a tab's URL
    static changeTabUrl( tabId, newUrl ) {
      const $iframe = $( `#iframe${tabId}` ); // Select the tab's iframe
      $iframe.attr( 'src', newUrl ); // Update the iframe's src attribute to the new URL
    }
    // Static method to set a tab as the active tab
    static setActiveTab( tabId ) {
      TabView.setActiveTab( tabId ); // Call the TabView's setActiveTab method
    }
    // Static method to initialize the tab controller
    static init() {
      // Add a click event listener to the add-tab button to add a new tab
      $( '#add-tab-btn' ).click( function() {
        TabController.addTab();
      } );
      // Create an initial tab upon initialization
      const initialTab = new TabModel( TabController.tabCounter, 'https://www.example.com' );
      TabView.createTab( initialTab.id, initialTab.url );
    }
  }
  // Define the CustomBrowser class to initialize the application
  class CustomBrowser {
    // Static method to initialize the application
    static init() {
      TabController.init(); // Initialize the TabController
    }
  }
  // Initialize the CustomBrowser when the script loads
  CustomBrowser.init();
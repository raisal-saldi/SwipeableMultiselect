# SwipeableMultiselect
A jquery plugin to make multiple selection on a bootstrap btn-group in an easier way

## Details
The Plugin allows you to make single or multiple selection. You can also press mouse and drag the cursor on other options to make selection in a faster way

## Dependencies
Swipeable Multiselect requires JQuery and Bootstrap 3. The plugin will work also with Bootstrap 4, but since Bootstrap has modified a lot the CSS from v3 to v4, the style of the plugin won't be the same.

## Usage:

```
$(document).ready(function(){

    $("#swipeable-basic").swipeableMultiselect({
        values: [{ "text": "Apple", "value": "apple"}, { "text": "Pear", "value": "pear" }, { "text": "Banana", "value": "banana" }]
    }); //basic usage


    $("#swipeable-radio").swipeableMultiselect({
        values: [{ "text": "Apple", "value": "apple"}, { "text": "Pear", "value": "pear" }, { "text": "Banana", "value": "banana" }],
        allowMultiple: false
    }); //radio selection (if you want only one option can be selected)


    $("#swipeable-active").swipeableMultiselect({
        values: [{ "text": "Apple", "value": "apple", "active": true }, { "text": "Pear", "value": "pear" }, { "text": "Banana", "value": "banana" }]
    }); //initialization with custom active option (you can set the flag active:true and the current option will be the active option after initialization)
});
```

## Methods

`GetSelectedValue`: returns an Array of the group allows multiple selection, String otherwise
`SetActive`: set active option by value dinamically after initialization. If the group allows multiple selection the method requires an Array, String otherwise

```
$(document).ready(function(){

    $("#swipeable-basic").swipeableMultiselect("GetSelectedValue"); //returns ["apple", "pear"]


    $("#swipeable-radio").swipeableMultiselect("GetSelectedValue"); //returns "apple"


    /* set active value dinamically after initialization */
    $("#swipeable-basic").swipeableMultiselect("SetActive", ["apple"]); 


    $("#swipeable-radio").swipeableMultiselect("SetActive", "apple");
});
```
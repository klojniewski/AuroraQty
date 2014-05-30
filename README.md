AuroraQty
=========

Shopping Cart Qty Input

##Installation

###Step 1: Link plugin file

```html
<script src="/js/aurora.qty.js"></script>
```

###Step 2: Add specific class attribute to your input

```html
<input maxlength="12" class="input-text qty" type="text" size="4" value="1" name="e_qty">
```

###Step 3: Call the AuroraQty script

```javascript
var auroraQty = new AuroraQty($$('.easy-shopping-content input.qty'));
```

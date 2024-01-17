# [Meat Web Shop](https://mesnica02.oa.r.appspot.com/)

- ## [Frontend](#frontend-development-with-react)
- ### [Client](#client-side)

1. [Client.js](#1-clientjs)
2. [Nav.js](#2-navjs)
3. [Bucket.js](#3-bucketjs)
4. [Header.js](#4-headerjs)
5. [Home.js](#5-homejs)
6. [Hero.js](#6-herojs)
7. [ProductsList.js](#7-productslistjs)
8. [About.js](#8-aboutjs)
9. [Products.js](#9-productsjs)
10. [SideNav.js](#10-sidenavjs)
11. [AboutUs.js](#11-aboutusjs)
12. [orderForm.js](#12-orderformjs)
13. [Footer.js](#13-footerjs)

- ### [Admin](#admin-1)

  1. [Admin.js](#1-adminjs)
  2. [AdminLogIn.js](#2-adminloginjs)
  3. [AdminProducts.js](#3-adminproductsjs)
  4. [AddProducts.js](#4-addproductsjs)
  5. [AdminOrders.js](#5-adminorderjs)
  6. [AdminOrder.js](#6-adminorderjs)

- ## [Backend](#backend-development-with-nodejs-and-express)

  1. [products.js / productsContorller.js](#productsjs--productscontorllerjs)
  2. [order.js / orderController.js](#orderjs--ordercontrollerjs)
  3. [form.js / formController.js](#formjs--formcontrollerjs)
  4. [login.js / logInController.js](#loginjs--logincontrollerjs)
  5. [logout.js / logoutController.js](#logoutjs--logoutcontrollerjs)
  6. [admin.js](#adminjs)

- ## [Deployment](#google-cloud-deployment)

# Backend Development with Node.js and Express

## [SERVER](https://github.com/andrija-zikovic/react-mini-project/blob/main/server)

The first framework for **Node.js** that I got acquainted with is **express**, in this project I use it to define URL routes.

After creating the first routes, I had to define a credentials middleware so I could define which URL
has access to this server. For this, I created two files, one in which I define the list of URLs that will
have access, and the other is middleware that checks whether the URL from which the request is coming is in the list of URLs
and gives permission to send credentials. After that, I use "**cors**" which also checks whether the URL has
permission to send requests.

## [products.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/routes/products.js) / [productsContorller.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/controllers/productsContorller.js)

<div align="right">

[Top](#meat-web-shop)

</div>
I have made several routes, the first one was for sending product data (url/products).

When the route is accessed, the server processes the **productsController** which pulls the product list from the mongoDB NoSQL database.

```javascript
[
  {
    _id: ObjectId,
    title: String,
    price: Number,
    onStorage: Number,
    meatType: String,
    imgSrc: String,
  },
];
```

and returns it as a response.
For extracting data from **mongoDB**, I use **"mongoose"** with which I connect to the
database, and create **Schema** with which I define what I want to extract from the database.

## [order.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/routes/order.js) / [orderController.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/controllers/orderController.js)

<div align="right">

[Top](#meat-web-shop)

</div>
The next route (url/order) processes the order. When the route is accessed, the server processes the orderController.

The orderController, with the data it receives through the request, creates a QR code that transmits the following information:

```javascript
{
HRVHUB30
EUR
${amount}
${req.body.buyer.company}
${req.body.buyer.address}
${req.body.buyer.zip} ${req.body.buyer.city}
Sample name
Sample Street
Sample Zipcode City
${bankAcc}
HR04
123456879-123456
COST
INVOICE NUM ${nextInvoiceNumber}
}
```

By scanning the QR code, the necessary payment data is filled inside the banking application.

Then, the controller also uses **"easyinvoice"** to generate a PDF file. Once the PDF file is generated, the orderController calls
the emailSender function, which uses **"nodemailer"** to send an email to the customer with the PDF file attached.

After the email is sent, the orderController saves the order in the MongoDB database.

## [form.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/routes/form.js) / [formController.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/controllers/formController.js)

<div align="right">

[Top](#meat-web-shop)

</div>

The route (url/form) is handled by the **formController**.

The formController receives (name, email, message) through the request, and then sends an email with the received information to the store's email using "nodemailer".

## [login.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/routes/login.js) / [logInController.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/controllers/logInController.js)

<div align="right">

[Top](#meat-web-shop)

</div>

The route (url/login) is handled by the **logInController**.

The logInController receives (username, password) through the request. It searches for the username in the MongoDB database.

```javascript
const foundUser = await User.findOne({ username });
```

If it doesn't find a username that matches the given username, it returns a negative response.

If it finds a username that matches the given username, it checks if the passwords match, using **"bcrypt"**.

```javascript
const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
```

If they don't match, it returns a negative response.

If they match, the logInController uses "jsonwebtoken" to create an accessToken and refreshToken. The refreshToken is stored in the database and returned through a cookie, while the accessToken is returned as JSON.

```javascript
res.cookie("jwt", refreshToken, {
  httpOnly: true,
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000,
});
res.json({ accessToken });
```

## [logout.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/routes/products.js) / [logoutController.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/controllers/logoutController.js)

<div align="right">

[Top](#meat-web-shop)

</div>

The route **url/logout** is handled by the logoutController, which checks if a JWT is sent through the cookie.

```javascript
const cookies = req.cookies;
if (!cookies?.jwt) return res.sendStatus(204);
const refreshToken = cookies.jwt;
```

If a JWT is sent, it searches the database for a User with that JWT. Once found, it deletes the JWT from the database for that user.

```javascript
const foundUser = await User.findOne({ refreshToken }).exec();
if (!foundUser) {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.sendStatus(204);
}

foundUser.refreshToken = "";
const result = await foundUser.save();
```

Then it returns an empty cookie and a positive response.

```javascript
res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
res.sendStatus(204);
```

# [admin.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/routes/api/admin.js)

<div align="right">

[Top](#meat-web-shop)

</div>
All requests related to the admin are handled through the **url/admin** route. CRUD operations related to products, order confirmation, and order rejection.

- [**url/admin/products**](#urladminproducts)
- [**url/admin/orders**](#urladminorders)
- [**url/admin/orderConfirme**](#urladminorderconfirme)
- [**url/admin/orderReject**](#urladminorderreject)

## url/admin/products

The route url/admin/products accepts four types of requests: GET, POST, PUT, DELETE.

```javascript
router
  .route("/products")
  .get(productsController.getAllProducts)
  .post(productsController.createProduct)
  .put(productsController.changeProducts)
  .delete(productsController.deleteProduct);
```

All types of requests are handled by the productsController.

### [productsController.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/controllers/productsController.js)

The getAllProducts function in the productsController is executed through a **GET** request. It retrieves information about all products from the MongoDB database using [server/model/Products.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/model/Products.js) and returns a list of products as a response.

```javascript
try {
  const products = await Products.find();
  if (products < 1) {
    return res.status(204).json({ message: "No products found." });
  }
  res.json(products);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
}
```

The createProduct function in the productsController is executed through a **POST** request. It configures cloud storage with **@google-cloud/storage**.

```javascript
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "mesnica02",
  keyFilename: "/workspaces/Mesnica/server/config/mesnica02-f5b8d956119e.json",
});
```

Then, it uploads an image from the request, resizes it to 600x400px using **sharp**, and saves it as a buffer.

```javascript
const resizedImageBuffer = await sharp(imagePath).resize(600, 400).toBuffer();
```

Then it saves the image to the specified cloud storage,

```javascript
await storage
  .bucket(bucketName)
  .file(uploadOptions.destination)
  .save(resizedImageBuffer, {
    metadata: uploadOptions.metadata,
    predefinedAcl: uploadOptions.predefinedAcl,
  });
```

and saves other request data along with the URL of the saved image in the database.

```javascript
const product = await Products.create({
  title: req.body.title,
  price: req.body.price,
  onStorage: req.body.onStorage,
  meatType: req.body.meatType,
  imgSrc: imgSrc,
});
```

The productsController executes the changeProducts function through a **PUT** request, which iterates through the request and updates the products in the database with the items from the request.

```javascript
for (const [productId, updateData] of Object.entries(updates)) {
  const { price, onStorage } = updateData;

  // Update the document based on the productId
  await Products.updateOne(
    { _id: productId }, // Convert the string to ObjectId using mongoose
    { $set: { price, onStorage } }
  );
}
```

The productsController executes the deleteProduct function through a **DELETE** request. This function receives the product ID from the request and then deletes the product with the given ID from the database.

```javascript
const deletedProduct = await Products.deleteOne({ _id: id });

if (!deletedProduct) {
  return res.status(404).json({ error: "Product not found" });
}
```

## [orderController.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/controllers/orderController.js)

This controller is executed through three routes:

- url/admin/orders
- url/admin/orderReject
- url/admin/orderConfirme

```javascript
router.route("/orders").get(orderController.getOrders);

router.route("/orderConfirm").post(orderController.orderConfirm);

router.route("/orderReject").post(orderController.orderReject);
```

### url/admin/orders

The url/admin/orders route executes the **getOrders** function inside [orderController.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/controllers/orderController.js)

The **getOrders** function uses the [Orders.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/model/Orders.js) **mongoose.Schema** model to retrieve information from the MongoDB database.
It then returns the information as JSON through the response.

```javascript
const ordersData = await orders.find();
if (orders < 1) {
  return res.status(204).json({ message: "No orders found." });
}
res.json(ordersData);
```

### url/admin/orderConfirm

The url/admin/orderConfirm route executes the **orderConfirm** function inside [orderController.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/controllers/orderController.js).

The **orderConfirm** function receives the order ID from the request.

Using the received ID, the function searches for the specific order in the database and updates its status to **{ status: true }**.

```javascript
const existingOrder = await orders.findById(id);

if (existingOrder.status === true) {
  return res.status(400).json({ error: "Order is already confirmed" });
}

await orders.findByIdAndUpdate(id, { $set: { status: true } }, { new: true });
res.status(200).json({ message: "Order confirm!" });
```

### url/admin/orderReject

The url/admin/orderReject route executes the **orderConfirm** function inside **[orderController.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/controllers/orderController.js)**.

The **orderReject** function works the same as **orderConfirm**, but instead of { status: true }, it updates the status to **{ status: false }**.

```javascript
const existingOrder = await orders.findById(id);

if (existingOrder.status === true) {
  return res.status(400).json({ error: "Order is already rejected" });
}

await orders.findByIdAndUpdate(id, { $set: { status: false } }, { new: true });
res.status(200).json({ message: "Order rejected!" });
```

# Frontend Development with React

# User

The main entry point of the React application is **App.js**.

## [App.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/App.js)

Inside App.js, two components are imported: [Client.js](#client.js) and [Admin.js](#admin.js), and routes are defined for each component.

```javascript
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Client />} />
        <Route path="admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- **BrowserRouter** wraps the entire application to enable the use of React Router.
- **Routes** defines the routes within the application.
- **Route** elements define which components should be displayed for a specific route.

# Client side

## 1. [Client.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Client.js)

<div align="right">

[Top](#meat-web-shop)

</div>

Inside the **Client.js** component, the **cartItems** state is defined using the **useState()** hook. This state is used to store information about the products that the user wants to purchase.

```javascript
const [cartItems, setCartItems] = useState([]);
```

- Four more functions are defined:

  - [deleteItem](#deleteitem)
  - [clearCart](#clearcart)
  - [calculateQuantity](#calculatequantity)
  - [handleAmountChange](#handleamountchange)

- ### [deleteItem](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Client.js#L15)

The **deleteItem** function takes an **itemId** parameter which is used as an identifier. It filters through **cartItems** using that identifier and creates a new list of products without the identified item from **cartItems**.
After creating the new list, it updates **cartItems** with the new list.

```javascript
const deleteItem = (itemId) => {
  const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
  setCartItems(updatedCartItems);
};
```

- ### [clearCart](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Client.js#L20)

**clearCart** function updates **cartItems** with an empty list.

```javascript
const clearCart = () => {
  setCartItems([]);
};
```

- ### [calculateQuantity](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Client.js#L24)

The **calculateQuantity** function takes two parameters, **newAmount** and **selectedUnit**. If the value of
**selectedUnit** is "kg", the function returns the value of **newAmount**. Otherwise, the function returns the value
of **newAmount** divided by 100, which essentially converts it to decagrams.

```javascript
const calculateQuantity = (newAmount, selectedUnit) => {
  if (selectedUnit === "kg") {
    return newAmount;
  } else {
    return newAmount / 100;
  }
};
```

- ### [handleAmountChange](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Client.js#L32)

The **handleAmountChange** function takes seven parameters:

- **operation**: can be "increment" or "decrement", used to determine whether the user wants to increase or decrease the quantity.
- **id**: the product's identification number.
- **title**: the product's name.
- **price**: the product's price.
- **selectedUnit**: can be "kg" or "dag".
- **amount**: the current quantity.
- **setAmount**: a function from **useState** to update the quantity.

The function first defines **incrementValue**. If **selectedUnit = "kg"**, then **incrementValue = 1**; otherwise, **incrementValue = 10**. This variable determines whether the unit is kilograms or decagrams.

Then, a new quantity **newAmount** is defined based on the value of the **operation** parameter. If its value is "increment", **amount + incrementValue** is added; otherwise, it is subtracted.

If **newAmount** is greater than or equal to one, **setAmount(newAmount)** is executed to update the new value of **amount**.

Inside the "if statement", the product **item** is defined with all the given parameters.

```javascript
const item = {
  id: id,
  description: title,
  price: price,
  "tax-rate": 5,
  quantity: calculateQuantity(newAmount, selectedUnit),
  unit: selectedUnit,
};
```

and execute another "if statement" to check if something is present inside **cartItems**.

If **cartItems** is empty, we update it with the defined product.

```javascript
if (cartItems.length === 0) {
  setCartItems([item]);
}
```

Otherwise, within **cartItems**, we search for the index of the product that has the same identification number as the **id** parameter.

```javascript
const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === id);
```

If the obtained index is not -1, it means that the product exists within **cartItems**. Then, a new list is created in
which the **item** is updated with the specified index, and the entire **cartItems** is updated.

```javascript
if (existingItemIndex !== -1) {
  const updatedCartItems = [...cartItems];
  updatedCartItems[existingItemIndex] = item;
  setCartItems(updatedCartItems);
}
```

Otherwise, we add the **item** as a new product within **cartItems**.

```javascript
setCartItems([...cartItems, item]);
```

And if **newAmount** is less than 1, it means that the product has no quantity and is no longer needed, so we create a new list of old products without the mentioned one and update **cartItems** with the new list.

```javascript
const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== id);
setCartItems(updatedCartItems);
setAmount(0);
```

- ### [Rendering Client.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Client.js#L72)

After the functions are defined, the component returns the structure of elements and other components.

- **Nav**: navigation bar.
- **Header**: top of the page.
- **Home**: home page.
- **Products**: products page.
- **AboutUs**: "About Us" page.
- **OrderForm**: page for filling out the order form.
- **Footer**: bottom of the page.

  ```javascript
  return (
    <div className="client">
      <Nav
        cartItems={cartItems}
        setCartItems={setCartItems}
        deleteItem={deleteItem}
        clearCart={clearCart}
      />
      <Header title={"Mesnica"} />
      <Routes>
        <Route
          path="/"
          element={<Home handleAmountChange={handleAmountChange} />}
        />
        <Route
          path="/products"
          element={<Products handleAmountChange={handleAmountChange} />}
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route
          path="/order"
          element={
            <OrderForm
              cartItems={cartItems}
              setCartItems={setCartItems}
              deleteItem={deleteItem}
              clearCart={clearCart}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
  ```

## 2. [Nav.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Nav.js)

<div align="right">

[Top](#meat-web-shop)

</div>

- The **Nav.js** component is a navigation bar-style component that requires four parameters which are passed to the **Bucket** component.

The Nav component first defines a **useState** to control the visibility of the **Bucket** component.

```javascript
const [isBucketVisible, setIsBucketVisible] = useState(false);
```

- Then the **[toggleBucketVisibility](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Client.js#L10)**
  function is defined, which updates the value of **isBucketVisible** to the opposite of its current value.
  **false -> true** | **true -> false**

```javascript
const toggleBucketVisibility = () => {
  setIsBucketVisible((prevState) => !prevState);
};
```

- ### [Nav.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Nav.js#L14)

  The **Nav.js** component renders an unordered list with links, a button for displaying the bucket, and the **Bucket** component.

  ````javascript
      return (
          <>
              <nav className='nav'>
                  <ul>
                      <li className='link__nav'>
                          <Link to="/">Home</Link>
                      </li>
                      <li className='link__nav'>
                          <Link to="/products">Proizvodi</Link>
                      </li>
                      <li className='link__nav'>
                          <Link to="/about-us">O nama</Link>
                      </li>
                      <li className='nav_bucket'>
                          <button onClick={toggleBucketVisibility} className='nav_bucket_button'>
                              <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"></svg>
                          </button>
                      </li>
                  </ul>
                  { isBucketVisible && <Bucket cartItems={cartItems} deleteItem={deleteItem} clearCart={clearCart} toggleBucketVisibility={toggleBucketVisibility} />}
              </nav>
              <Outlet />
          </>
      )
  ```<div align="right">
  ````

[Top](#meat-web-shop)

</div>
## 3. [Bucket.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Bucket.js)

- The **Bucket.js** component displays the products that the customer has chosen to purchase. It requires four parameters:

  - **cartItems**
  - **deleteItems**
  - **clearCart**
  - **toggleBucketVisibility**

First, the **calculateTotalPrice** function is defined.

- ### [calculateTotalPrice](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Bucket.js#L7)

The **calculateTotalPrice** function calculates the total price of all products by using the **reduce** function, which iterates through the **cartItems** and multiplies **quantity \* price** for each item, then adds them to the **total**.

```javascript
const calculateTotalPrice = () => {
  const totalPrice = cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.price;
  }, 0);

  return totalPrice.toFixed(2); // Rounds to two decimal places
};
```

Return the **totalPrice** by limiting it to two decimal places

```javascript
return totalPrice.toFixed(2);
```

- ### [Bucket.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Bucket.js#L15)

**Bucket.js** returns in two ways:

- **Empty bucket (if (cartItems.length < 1) {..})**

It checks the state of **cartItems**. If the length of **cartItems** is less than 1, indicating that **cartItems** is empty, it renders an element with a text informing the customer that the bucket is empty.

```javascript
return (
  <section className="bucket">
    <p style={{ textAlign: "center" }}>Your cart is empty!</p>
  </section>
);
```

- **Products Bucket (else {..})**

Otherwise, it renders elements that display a table with products, individual quantity, price, and a button to delete the product,
as well as the total price and buttons for ordering and clearing the bucket.

The table is displayed by iterating through **cartItems** and for each item, a row is displayed in the table with information about that item and a button to remove the product from **cartItems**.

```javascript
<tbody className="bucket__tbody">
  {cartItems.map((cartItem, index) => (
    <tr key={index}>
      <td>{cartItem.description}</td>
      <td>
        {cartItem.quantity} {cartItem.unit}
      </td>
      <td>{parseFloat(cartItem.quantity * cartItem.price).toFixed(2)} €</td>
      <td>
        <button className="delete" onClick={() => deleteItem(cartItem.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="0.7em"
            viewBox="0 0 384 512"
          ></svg>
        </button>
      </td>
    </tr>
  ))}
</tbody>
```

## 4. [Header.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Header.js)

<div align="right">

[Top](#meat-web-shop)

</div>

- **Header.js** is a component that displays the top of the page.
  It requires one parameter, whose value is displayed inside the element.

  ```javascript
  const Header = ({ title }) => {
    return (
      <header className="header">
        <h1 className="header__h1">{title}</h1>
        <p>SINCE 1923.</p>
      </header>
    );
  };
  ```

## 5. [Home.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Home.js)

<div align="right">

[Top](#meat-web-shop)

</div>

**Home.js** is a component that displays the home page. It requires one parameter that is passed to another element.

- ### [Home.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Home.js#L9)

  It renders three components:

  - **Hero**
  - **ProductList**
  - **About**

  inside the main element.

  ```javascript
  return (
    <main className="home">
      <Hero />
      <h2 className="prducts-list__h2">TOP SELLERS</h2>
      <ProductsList
        handleAmountChange={handleAmountChange}
        meatType={""}
        host={"home"}
      />
      <About />
    </main>
  );
  ```

## 6. [Hero.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Hero.js)

<div align="right">

[Top](#meat-web-shop)

</div>

**Hero.js** is a component that is displayed below the **Header.js** component on the home page.
It displays an image with an animated label "Welcome".

- ### [Hero.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Hero.js#L6)

  ```javascript
  const Hero = () => {
    return (
      <section className="hero">
        <h2 className="hero__h2" loading="lazy">
          Welcome
        </h2>
        <figure>
          <img src={myImage} alt="hero.jbg" width="1954" height="644" />
          <figcaption className="offscreen">Meat on plate</figcaption>
        </figure>
      </section>
    );
  };
  ```

## 7. [ProductsList.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/ProductsList.js)

<div align="right">

[Top](#meat-web-shop)

</div>

- **ProductsList.js** requires 3 parameters:

  - **handleAmountChange**
  - **meatType**
  - **host**

  and defines two **useState** hooks, one for updating the product state and the other for updating the list of products.

  ```javascript
  const [noProductsCheck, setNoProductsCheck] = useState(false);
  const [products, setProducts] = useState([]);
  ```

Then, using the **useEffect** hook, it fetches the list of products from the defined URL.
If the response status is negative, it updates **noProductsCheck** to **true**.
Otherwise, if the response is positive, it updates **products** with the received list of products.

```javascript
const baseUrl = process.env.REACT_APP_PRODUCTS_CALL_API;

const url = baseUrl + meatType;

const res = await fetch(url);
if (!res.ok) {
  throw new Error("Network response was not ok");
}

if (res.status === 204) {
  setNoProductsCheck(true);
} else {
  const productsData = await res.json();
  setProducts(productsData);
  setNoProductsCheck(false);
}
```

- ### [ProductsList.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/ProductsList.js#L35)

  If **noProductsCheck** is true, it means that there are no products fetched from the server.

  It returns an element with a text informing the customer that there are no products. This happens if the defined **meatType**
  does not exist in the database.

  ```javascript
  if (noProductsCheck) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "25vh" }}>No products!</h2>
    );
  }
  ```

Otherwise, it returns an element that iterates through the received list of products in two ways:

If **host='home'**, which means that the **ProductsList** is displayed in the **Home** component, the list of products is limited
to 4 products using the **slice** function, and it iterates through those four products using the **map** function. For each iteration,
a **ProductCard** component is displayed, and parameters from that iteration are passed to it.

```javascript
    host === 'home' ? (
        products.slice(0, 4).map((product) => (
            <ProductCard
                key={product._id}
                id={product._id}
                src={product.imgSrc}
                title={product.title}
                price={product.price}
                handleAmountChange={handleAmountChange}
            />
        ))
    )
```

Otherwise, it iterates through all the products.

```javascript
products.map((product) => (
  <ProductCard
    key={product._id}
    id={product._id}
    src={product.imgSrc}
    title={product.title}
    price={product.price}
    handleAmountChange={handleAmountChange}
  />
));
```

## 8. [About.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/About.js)

<div align="right">

[Top](#meat-web-shop)

</div>

**About.js** is a component that renders a **<section>** element containing several **<article>** elements that display text about the butcher shop.

```javascript
<section className="about">
  <article className="about_article">
    <h2>One hundred years of tradition!</h2>
    <img
      src={Mesnica1987}
      width="736px"
      height="486px"
      alt="1987"
      className="about_article01_img"
    />
    <h2>SINCE 1923.!</h2>
  </article>
</section>
```

## 9. [Products.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Products.js)

<div align="right">

[Top](#meat-web-shop)

</div>

- **Products.js** is a parent component that consists of two components:

  - **[SideNav](#10-sidenavjs)**: navigation bar.
  - **[ProductsList](#7-productslistjs)**: product list.

  It requires one parameter:

  - **[handleAmountChange](#handleamountchange)**

  And defines a **useState** to control the display of a specific type of meat.

  ```javascript
  const [meatType, setMeatType] = useState("");
  ```

- ### [Products.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Products.hs.js#L8)
  ```javascript
  return (
    <main className="products">
      <SideNav setMeatType={setMeatType} />
      <ProductsList
        handleAmountChange={handleAmountChange}
        meatType={meatType}
        host={""}
      />
    </main>
  );
  ```

## 10. [SideNav.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/SideNav.js)

<div align="right">

[Top](#meat-web-shop)

</div>

**SideNav.js** is a component that requires one parameter:

- **setMeatType**: updating the display of the meat type.

It defines a function **[handleMeatTypeChange](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/SideNav.hs.js#L4)** that requires one parameter
and uses **setMeatType** to update **meatType** with the specified parameter.

```javascript
const handleMeatTypeChange = (type) => {
  setMeatType(type);
};
```

- ### [SideNav.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/SideNav.hs.js#L8)
  **SideNav.js** renders a list of terms that, when selected, execute **handleMeatTypeChange** by adding the term as a parameter.
  Here is an example of one term:
  ```javascript
  <li className="sideNav__li" onClick={() => handleMeatTypeChange("chicken")}>
    <p className="sideNav__p">Chicken</p>
  </li>
  ```

## 11. [AboutUs.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/AboutUs.js)

<div align="right">

[Top](#meat-web-shop)

</div>

**AboutUs.js** is a component that simultaneously displays informative text about the butcher shop, a dynamic list of continuously changing images, and allows users to easily send a message through an available form.

First, it defines a **useState** variable that contains three **key: value** pairs.

```javascript
const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});
```

- Next, the function **[handleInputChange](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/AboutUs.js#L11)** is defined.
  It takes an **event** as a parameter. From that event, the **name** and **value** are extracted,
  and then it updates the state **formData** by setting the new **value** for the corresponding **key** within the current state.

  ```javascript
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  ```

- Next, the **[handleSubmit](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/AboutUs.js#L16)** function is defined. It first prevents the default behavior of the form by calling **e.preventDefault()**. Then it sends a **POST** request to the **API** with the data from **formData**.

  ```javascript
      fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
      })
  ```

If the response is successful, the form is reset and the API response is displayed in the console. If the response is unsuccessful, the error is caught and displayed in the console.

After that, an image context is created that requires all image files within the **public/img** folder, and then an array of images and a state to track the current image index are created.

```javascript
const imageContext = require.context("/public/img", false, /\.(jpg|jpeg|png)$/);

const images = imageContext.keys().map(imageContext);

const [currentIndex, setCurrentIndex] = useState(0);
```

- Finally, useEffect is used to automatically change the image index every 10 seconds.

  ```javascript
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);
  ```

- ### [AboutUs.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/AboutUs.js#L65)

  The **AboutUs.js** component implements key elements for displaying information about the Butcher Shop on the website.
  The structure of the component includes:

  - **Main Element (`<main>`):**
    - Set with the class "aboutUs".
    - Acts as the main container for all information related to the Butcher Shop.
  - **Sections (`<section>`):**
    - Different sections within the main element, each focused on a specific aspect of the butcher shop.
    - These sections organize information on the website and make it easier for users to find specific data.
  - **Articles (`<article>`):**
    - Each section contains articles that provide textual descriptions.
    - The text within the articles describes various aspects of the Butcher Shop, including history, quality, product range, and an invitation to visit.
  - **Image Rotation System:**
    - Within certain articles, a system is set up that dynamically rotates images.
    - This visual element contributes to the attractiveness of the page and helps better represent the atmosphere of the Butcher Shop.
  - **Contact Form Section (`<form>`):**
    - The last section contains a contact form for contacting the Butcher Shop.
    - The form has fields for entering name, email, and message, as well as a submit button.
    - Data from the form is processed using the handleSubmit function.

  This structure allows users to explore different aspects of the Butcher Shop, visually experience the atmosphere through dynamic images, and easily
  get in touch with the shop through the form. The component contributes to an organized and appealing display of information about the Butcher Shop on the website.

## 12. [orderForm.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/orderForm.js)

<div align="right">

[Top](#meat-web-shop)

</div>

- **orderForm.js** is a component responsible for displaying the order form.
  This component allows users to fill out a form with their information and submit an order with pre-added items.
  It requires three parameters:

  - **cartItems**
  - **deleteItem**
  - **clearCart**
    The component uses useState to track the purchase status (whether the order is successful), and it also uses useRef to reference the form.

  ```javascript
  const [buyStatus, setBuyStatus] = useState(false);
  const formRef = useRef(null);
  ```

- ### [handleSubmit](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/orderForm.js#L8)

After that, the **handleSubmit** function is defined to handle the order submission data. handleSubmit uses **event.preventDefault()** to prevent the default behavior of the form, which avoids page reload when submitting the form.
To retrieve the form data, the **FormData** object is used to get the data from the form. **formRef.current** represents a reference to the HTML form.

```javascript
event.preventDefault();
const formData = new FormData(formRef.current);
```

Then, the **formValues** object is populated by iterating through the form data, and the fields for first name **(fname)** and last name **(lname)**.

The first name (**fname**) and last name (**lname**) are merged into a single field called **company**. Other data is directly added to the **formValues** object.

```javascript
const formValues = {};
formData.forEach((value, key) => {
  if (key === "fname" || key === "lname") {
    formValues["company"] = `${formData.get("fname")} ${formData.get("lname")}`;
  } else {
    formValues[key] = value;
  }
});
```

Finally, the **handleOrderSend** function is called with the cart items (**cartItems**) and customer data (**formValues**).

```javascript
handleOrderSend(cartItems, formValues);
```

- ### [handleOrderSend](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/orderForm.js#L25)

The **handleOrderSend** function is a key function for sending orders to the server.

First, the URL is defined from the environment, and then **fetch** is used to send a **POST** request to the specified **URL**.
The **Content-Type** header is set to **application/json**, and the request body is set to the **JSON** representation
of an object with the products from the cart (**cartItems**) and the buyer's data (**buyerData**).

```javascript
    try {
        const url = process.env.REACT_APP_ORDER_CALL_API;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "products": cartItems, "buyer": buyerData }), // Send cartItems as JSON
        });
```

Then it checks if the **HTTP** response is successful (**status code 200**). If the response is successful, then it sets
**buyStatus** to true (indicating successful order submission), clears all products from the cart, and prints a message about
the successful order submission.

```javascript
if (res.ok) {
  setBuyStatus(true);
  clearCart();
  const data = await res.json();
  console.log(data.message);
}
```

If there is a problem during order submission (e.g. network issues or unsuccessful response status),
the error is caught and printed in the console.

```javascript
    catch (err) {
        console.error('Error giving order:', err)
    }
```

- ### [calucalteTotalPrice](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/orderForm.js#L48)

The **calculateTotalPrice** function is used to calculate the total price of the products in the cart, taking into account the quantity and price of each individual product.

First, a variable totalPrice is defined and set to an initial value of 0. This variable will be used to accumulate the total price of the products in the cart. Then, the **reduce** method is used to iterate through all the products in the cartItems and calculate the total price. For each product, the quantity (**cartItem.quantity**) is multiplied by the price (**cartItem.price**), and the result is added to the current sum (**total**).

```javascript
const totalPrice = cartItems.reduce((total, cartItem) => {
  return total + cartItem.quantity * cartItem.price;
}, 0);
```

    Finally, the result is rounded to two decimal places using **toFixed(2)**. This ensures that the total price is displayed with exactly two decimal places.

    ```javascript
    return totalPrice.toFixed(2);
    ```

- ### [orderForm.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/orderForm.js#L56)

  **orderForm.js** is rendered in two different ways, depending on the condition.

  - The first condition (**[if (buyStatus) {...}](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/orderForm.js#L56)**):

    - If buyStatus is true, it means that the order has been successfully submitted. A specific part of JSX is displayed with a message about the successful order.

  - The second condition (**[else if (cartItems.length < 1) {...}](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/orderForm.js#L68)**):

    - If buyStatus is not true and the length of cartItems (products in the cart) is less than 1, it means that the cart is empty.
      A specific part of JSX is displayed with a message about the empty cart.

  - The third condition (**[else {...}](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/orderForm.js#L74)**):

    - If none of the previous conditions are met, it means that the user has products in the cart and has not submitted the order.
      The remaining JSX is displayed, which shows the list of products in the cart, the total price, a form for entering data, and buttons for clearing the cart and submitting the order.

## 13. [Footer.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Client/Footer.js)

<div align="right">

[Top](#meat-web-shop)

</div>

**Footer.js** is a simple component that renders contact information and a registered trademark with the name of the butcher shop and the current year.

# Admin

## 1. [Admin.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/Admin.js)

<div align="right">

[Top](#meat-web-shop)

</div>

- **Admin.js** is a component that represents the admin interface.
  First, the states of the variables are defined: - **isLoggedIn** tracks whether the admin is logged in or not. - **isDropdownOpen** is used to manage the state of the dropdown menu. - **token** contains the authentication token. - **message** is used to display informational messages. - **dropdownRef** is a reference to the dropdown menu element.

  ```javascript
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [token, setToken] = useState("");
  const dropdownRef = useRef(null);
  const [message, setMessage] = useState("");
  ```

- ### [handleLogin](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/Admin.js#L18)

**handleLogin** is an asynchronous function for handling administrator login.
First, the **URL** is defined from the environment, then the **fetch** function is used to send an asynchronous **HTTP POST** request to the defined URL. The request settings include the method (POST), as well as headers and body that are set to send JSON data with the username and password.

```javascript
const url = process.env.REACT_APP_LOGIN;
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username, password }),
});
```

Then, **response.ok** checks if the HTTP response is successful (status code 2xx). If it is, the code block inside the if statement is executed.
**const { accessToken } = await response.json()** parses the JSON response from the server and retrieves the accessToken.
**setToken(accessToken)** sets the token in the component state using the **setToken** function.
**setIsLoggedIn(true)** sets **isLoggedIn** to **true** to indicate that the administrator has successfully logged in.

```javascript
if (response.ok) {
  const { accessToken } = await response.json();
  setToken(accessToken);
  setIsLoggedIn(true);
}
```

If the response is not successful, **await response.json()** is used to parse the JSON response from the server that contains error data.
**setMessage(errorResponse.error)** sets the error message in the component state using the **setMessage** function.
**console.error('Authentication failed')** logs an error message to the console.

```javascript
    else {
        const errorResponse = await response.json();
        setMessage(errorResponse.error);
        console.error('Authentication failed');
    }
```

This **handleLogin** function integrates the logic for administrator login, handling different success and failure scenarios during the asynchronous login process to a specific URL.

- ### [logOut](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/Admin.js#L45)

The **logOut** function performs the logic for logging out the administrator.

**await fetch('/api/logout', { method: 'POST', ... })** uses the **fetch** function to send an **asynchronous HTTP POST request to '/api/logout'** endpoint on the server.

By setting method: **'POST'**, the request method for logging out is specified using the **HTTP POST** method. This configuration is important as it specifically indicates the intention to perform a logout. Additionally, the **credentials: 'include'** option is chosen to ensure that credentials, in this case, **cookies**, are automatically included in the request. This is crucial when working with cookie-based authentication.

When set to **'include'**, it ensures that cookies are automatically included in every request, providing the necessary information for logging out. Furthermore, **headers: { 'Content-Type': 'application/json' }** sets the request header to indicate that data is being sent in **JSON format**. This configuration ensures that the logout data is structured as JSON, adhering to the appropriate standards when communicating with the server.

```javascript
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
        });
```

After that, **response.ok** is used to check if the **HTTP** response is successful, meaning it has a **2xx status code**.
If it is, the code block inside the **if** statement is executed.
In that case, **setIsLoggedIn(false)** sets the value of **isLoggedIn** to _false_, indicating that the administrator has successfully logged out.
Additionally, **console.log('Logout successful')** prints a message about successful logout to the console, providing confirmation of a smooth logout process.

```javascript
if (response.ok) {
  setIsLoggedIn(false);
  console.log("Logout successful");
} else {
  console.error("Logout failed");
}
```

**catch (error)**: Catches all types of errors that can occur during the execution of the function.
**console.error('Error during logout:', error)**: Prints an error message to the console using console.error.

```javascript
    } catch (error) {
        console.error('Error during logout:', error);
    }
```

This **logOut** function integrates the logic for logging out the administrator, handling different success and failure scenarios during the asynchronous logout process to the **'/api/logout'** endpoint.

- ### [toggleDropdown](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/Admin.js#L66)

This function changes the state of **isDropdownOpen** to its current opposite. If the current state is **false**, after this expression, the state is changed to **true**.

```javascript
const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};
```

- ### [handleOutsideClick](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/Admin.js#L70)
  This function **handleOutsideClick** is used to close the dropdown menu when the user clicks outside of it.
  **dropdownRef.current** keeps track of the existence of a reference (**current**) to a previously set **DOM element** using **useRef**.
  If that reference exists, an additional check follows. **e.target** represents the element that the user clicked on,
  i.e., the element that triggered the click event.
  If the expression **!dropdownRef.current.contains(e.target)** is true, it indicates that the user did not click inside the referenced element.
  In that case, the state of the variable **isDropdownOpen** is set to **false**, resulting in the closure of the dropdown menu.
  This logic allows users to close the dropdown menu simply by clicking outside of it, enhancing the overall user experience.
  ```javascript
  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };
  ```
- ### [Implementation of useEffect](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/Admin.js#L76)

  **useEffect** is used to set up an event listener that tracks clicks on the entire document.
  When the component is mounted, an event listener is added that calls the **handleOutsideClick** function whenever a click occurs
  outside of the component. When the component is unmounted, the event listener is removed.

  ```javascript
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  ```

- ### [Rendering Admin.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/Admin.js#L109)

  First, a `<main>` element is created, within which other elements are rendered in two ways:

  - If the user is not logged in (the **isLoggedIn** state is **false**):
    A section (`<section>`) for administrator login is displayed.
    This includes a title "Log in:", a login component (**AdminLogIn**),
    displaying any error message (**message**), and information about the username and password.
  - If the user is logged in (the **isLoggedIn** state is **true**):
    A navigation menu (`<nav>`) is displayed with a list of links (`<ul>`) that provide access to different parts
    of the admin interface, such as products, orders, statistics, and the option to log out.
    Additionally, depending on the **isDropdownOpen** state, a dropdown menu with options "List" and "Add" for products is displayed.
    Within the routing (`<Routes>`), depending on the current route, the corresponding parts of the interface are displayed,
    such as the product list, orders, statistics, or adding a new product.
    Clicking on the "Log out" link triggers the **logOut** function, which performs the administrator logout.

  **React Router** components such as **Link**, **Route**, **Routes**, **Outlet** are used to manage routes and navigation within
  the admin interface.

## 2. [AdminLogIn.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminLogIn.js)

<div align="right">

[Top](#meat-web-shop)

</div>

- **AdminLogIn.js**
  is a component that receives **[handleLogin](#handlelogin)** as a parameter and is used to display and handle the login form for administrators. It uses **useState** to track the state of the username and password.

  ```javascript
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  ```

- ### [handleSubmit](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminLogIn.js#L7)

**handleSubmit** is a function that is called when the user submits the form.
It prevents the page from refreshing (default form behavior) and
calls the function **[handleLogin(username, password)](#handlelogin)** with the entered username and password.

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  handleLogin(username, password);
};
```

- ### [AdminLogIn.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminLogIn.js#L12)
  Renders an HTML form with `<input>` fields for entering a username and password.
  ```javascript
  <form onSubmit={handleSubmit} className="adminLogIn"></form>
  ```
  Each field uses the value attribute to be controlled based on the state (username and password) defined using **useState**.
  It uses the **onChange** event to update the state every time the user enters or changes a value in the field.
  ```javascript
          <input type="text" placeholder="Username" value={username}
                  onChange={(e) => setUsername(e.target.value)} className='adminLogIn_username'/>
          <input type="password" placeholder="Password" value={password}
                  onChange={(e) => setPassword(e.target.value)} className='adminLogIn_password'/>
  ```
  The `<button>` "Login" triggers the **handleSubmit** function when pressed.
  ```javascript
  <button type="submit" className="adminLogIn_submit">
    Login
  </button>
  ```

## 3. [AdminProducts.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminProducts.js)

<div align="right">

[Top](#meat-web-shop)

</div>

- **AdminProducts**
  is a functional component responsible for managing and displaying the list of products in the admin interface.
  It communicates with the API to fetch, update, and delete product information.

  Definition of variable states:

  - **adminPro**: Contains the list of products fetched from the API.
  - **showImage**: Field that tracks the visibility of images for each row.
  - **produtsChange**: Tracks changes in product data.
  - **searchQuery**: Represents the user's query for filtering products.
  - **message**: Stores messages displayed to the user.
  - **productDeleteInfo**: Contains information about the product to be deleted.

- ### [filteredProducts](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminProducts.js#L11)

  **filteredProducts** function uses the **filter** method on the **adminPro** array to filter products based on
  the user's input, i.e., **searchQuery**.
  The **filter** function creates a new array and adds all the **product** objects from **adminPro** whose **product.title**
  includes the text from **searchQuery**.

  ```javascript
  const filteredProducts = adminPro.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  ```

- ### [handleSearchInputChange](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminProducts.js#L15)

**handleSearchInputChange** is a function that changes the state of **searchQuery** to the value of **event.target.value** from
the event that is passed to it.

```javascript
const handleSearchInputChange = (e) => {
  setSearchQuery(e.target.value);
};
```

- ### [handleProductChange](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminProducts.js#L19)

**handleProductChange** is a function used to manage changes within product data.
It requires three parameters:

- **id**: identification number.
- **key**: Key (property name) of the product data being changed.
- **value**: the new value being added to the selected property.

  ```javascript
  const handleProductChange = (id, key, value) => {};
  ```

First, it checks if there is already a record for a specific product in the **produtsChange** state. If present, the **setProductsChange** function is used to update the **produtsChange** state. In case there is a previous state for that product, the spread operator **(...prevState)** is used to retain the previous values. Then, it adds or updates the value under the key **id**, and sets the new value **value** under the key **key**.

```javascript
if (produtsChange[id]) {
  setProductsChange((prevState) => ({
    ...prevState,
    [id]: {
      ...prevState[id],
      [key]: value,
    },
  }));
}
```

If there is no record for the selected product, it creates a new record using **setProductsChange**. It again uses spread operator to retain the previous state, and then adds a new record under the key **id** which has the key **key** with the value **value**.

```javascript
    else {
    setProductsChange((prevState) => ({
        ...prevState,
        [id]: {
        [key]: value,
        },
    }));
    }
```

- ### [handleClick](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminProducts.js#L38)

**handleClick** is a function used to manage the display of a specific product image.

It requires one parameter:

- **index**: The index of the clicked row.

```javascript
const handleClick = (index) => {};
```

First, a new array of **false** values is created, where the length of the array is equal to the number of rows in the table (**adminPro.length**).
Then, this array is set as the initial state for image display (**setShowImage(initialShowImage)**).

```javascript
const initialShowImage = Array(adminPro.length).fill(false);
setShowImage(initialShowImage);
```

After that, a copy of the current state for image display is created (**const newShowImage = [...showImage]**).
The value for the clicked row (at index) is toggled, meaning that if the current value is **true**, it becomes **false**, and vice versa.
This change is made to show or hide the image of that row. Finally, the new state for image display is set to the updated value
(**setShowImage(newShowImage)**).

```javascript
const newShowImage = [...showImage];
newShowImage[index] = !newShowImage[index];
setShowImage(newShowImage);
```

This function enables dynamic display or hiding of images by clicking on a specific row in the table,
using the **showImage** state that tracks the current visibility state of images for each row.

- ### [handleProductsChangeSubmit](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminProducts.js#L46)

**handleProductsChangeSubmit** is a function that is called when the user wants to send product changes to the server.

It uses the **fetch** function to send an asynchronous **HTTP PUT** request to a specific **API** endpoint defined in the environment.
It sets the necessary request options, including the method, authorization token, and content type to JSON.

```javascript
fetch(process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API, {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${token.token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(produtsChange),
});
```

After the server processes the request, the response is handled. If the response is successful (status code 2xx), the **produtsChange** state is reset to an empty object using **setProductsChange({})**. If the response is unsuccessful, an error message is set (**setMessage("Error while updating data!")**) and an error is thrown to move to the **catch** block.

```javascript
    .then((response) => {
        if (response.ok) {
        setProductsChange({});
        return response.json();
        }
        setMessage("Error while updating data!");
        throw new Error("Network response was not ok.");
    })
```

If the response was successful, the JSON data received from the response is processed. The API response is logged in the console
(**console.log("API response:", data)**). The message for successful update is set (**setMessage(data.message)**).

```javascript
    .then((data) => {
        console.log("API response:", data);
        setMessage(data.message);
    })
```

If any error occurs during the request execution (e.g., network error, unsuccessful server response),
the error is caught in the **catch** block. A detailed error description is logged to the console (**console.error("Error:", error)**).
The error message is set to the value of the error (**setMessage(error)**).

```javascript
    .catch((error) => {
        console.error("Error:", error);
        setMessage(error);
    });
```

In short, this function performs asynchronous communication with the server to send product changes, and then handles the response and manages the application state based on the results.

- ### [handleProductDelete](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminProducts.js#L73)

**handleProductDelete** is a function that is called when the user wants to delete a specific product.
It uses the **fetch** function to send an asynchronous **HTTP DELETE** request to a specific API endpoint defined in the environment.
It sets the necessary request options, including the method, authorization token, content type to JSON,
and the request body that contains the **ID** of the product to be deleted.

```javascript
fetch(process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token.token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id: id }),
});
```

After the server processes the request, the response is handled. If the response is successful (status code 2xx), the **adminPro** state is updated by removing the product with the corresponding **ID** from the products array. The **productDeleteInfo** state is reset to an empty value. A message indicating successful product deletion is set.

```javascript
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updatedProducts = adminPro.filter((product) => product._id !== id);
        setAdminPro(updatedProducts);
        setProductDeleteInfo();
        setMessage(response.message);
    })
```

If any error occurs during the request execution (e.g., network error, unsuccessful server response),
the error is caught in the **catch** block. A detailed error description is logged to the console.
The error message is set to the value of the error.

```javascript
    .catch((error) => {
        console.error("Error deleting product:", error.message);
        setMessage(error.message);
    });
```

In short, this function performs asynchronous communication with the server to delete the selected product, and then handles the response
and manages the application state based on the results.

- ### [Implementation of useEffect](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminProducts.js#L104)

  **useEffect** is used to execute asynchronous code, particularly making requests to the server to fetch product data.
  Inside the **useEffect**, the **fetchData** function is defined, which contains the logic for fetching the data.

  ```javascript
  useEffect(() => {
    const fetchData = async () => {};
  });
  ```

**fetchData** uses the **fetch** function to send an HTTP request to a specific API endpoint. The request headers include an authorization token to verify the user's authenticity. If the response is successful (status code 2xx), the fetched product data is converted to JSON format using `await res.json()`. The **adminPro** state is updated with the fetched product data (**setAdminPro(productsData)**).

```javascript
    try {
        const res = await fetch(
            process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API, {
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
        });
        if (!res.ok) {
            throw new Error("Network response was not ok");
        } else {
            const productsData = await res.json();
            setAdminPro(productsData);
        }
    }
```

If an error occurs during the request execution (e.g., network error, unsuccessful server response), the error is caught in the **catch** block.
A detailed error description is logged to the console.

```javascript
    catch (error) {
        console.error("Error Fetching data:", error);
    }
```

- ### [AdminProducts.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminProducts.js#L126)

  **AdminProducts** is rendered in the following way:

  - **Product Deletion**:

    - Delete Confirmation:

      - If there is product deletion information (**productDeleteInfo**), a dialog confirming the deletion of a specific product is rendered. The product name is displayed in the dialog, and the user can choose "YES" to confirm the deletion or "NO" to cancel. Product deletion is performed through the **handleProductDelete** function.

    - Message Display:
      - If there is a message (**message**), a dialog with the message and a close button is rendered. The message is set and controlled by the component's state.

  - **Table**:

    - Table Header:

      - The table header is rendered with column names: "Serial Number", "Name", "Meat Type", "Price/kg", "In Stock", "IMG", and an empty column for buttons and actions.

    - Table Body:

      - The table body maps through the filtered products and displays them in table rows. Each table row contains information about the product such as serial number, name, meat type, price per kilogram, available quantity, button for displaying the image, option for adding an image, button for deleting the product, and more.

    - Table Footer:
      - The table footer is rendered with a submit button. The button allows submitting changes to the server through the **handleProductsChangeSubmit** function.

  Overall, AdminProducts is rendered with a range of functionalities and elements that enable the administrator to efficiently manage products through a user-friendly interface.

## 4. [AddProducts.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AddProducts.js)

<div align="right">

[Top](#meat-web-shop)

</div>

- **AddProducts** is a functional component responsible for adding new products to the system.
  This component provides a form for entering product data, including name, price, quantity in stock, meat type, and product image.

  State variable definition: - **productInfo**: tracks the state of the new product data. It includes name, price, quantity in stock, meat type, and
  product image.

  ```javascript
  const [productInfo, setProductInfo] = useState({
    title: "",
    price: "",
    onStorage: "",
    meatType: "",
    image: null,
  });
  ```

- ### [handleAddSubmit](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AddProducts.js#L13)

The **handleAddSubmit** function is used to process the addition of a new product to the server via an HTTP POST request.

The form submission event handling starts by preventing the default form behavior using **e.preventDefault()**, which prevents the page from refreshing. After that, the function defines the **URL** to which the **HTTP** request will be sent. This **URL** is retrieved from the environment, providing flexibility and allowing for easy server address changes.

```javascript
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API;
```

The next step in the process is creating a new **FormData** object that will be used to transfer form data in a key-value format. **FormData** allows structuring data in a way that is suitable for sending to the server.

```javascript
const formData = new FormData();
formData.append("title", productInfo.title);
formData.append("price", productInfo.price);
formData.append("onStorage", productInfo.onStorage);
formData.append("meatType", productInfo.meatType);
formData.append("image", productInfo.image);
```

Next, the **HTTP POST** request is sent using the **fetch** function. The request settings include specifying the
method (**POST**), including authentication information (**credentials: 'include'**), setting the authorization token
in the header (**headers**), and defining the request body that contains a **FormData** object with the product data.

```javascript
const req = await fetch(url, {
  method: "POST",
  credentials: "include",
  headers: {
    Authorization: `Bearer ${token.token}`,
  },
  body: formData,
});
```

After sending the request, the function checks if the server response is successful (status code 2xx). If it is, a message is printed in the console confirming the successful addition of the product.

```javascript
if (req.ok) {
  console.log("Product Add");
}
```

In case of an error during the request submission, the error is caught in the catch block. A detailed description of the error is printed in the console.

```javascript
        } catch (err) {
            console.error('Error giving product:', err)
        }
```

All of these steps are a crucial part of the process of adding a new product to the server via an HTTP POST request, ensuring that the process runs smoothly and reliably.

- ### [handleInputChange](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AddProducts.js#L40)

  **handleInputChange** is an event handler used to handle changes in form inputs.

  First, the object is deconstructed to extract the **name** and **value** from **event.target**. **event.target** refers to the element that triggered the event, in this case, the form input element. **name** is the name of the input element, and **value** is the current value entered in the input element.

  ```javascript
  const { name, value } = event.target;
  ```

  Then, the **setProductInfo** function is used to update the **productInfo** state. **...productInfo** uses the spread operator to copy all the current values of **productInfo** into a new object. **[name]: value** adds or updates the value with a key that is equal to **name** with the new value **value**.

  ```javascript
  setProductInfo({ ...productInfo, [name]: value });
  ```

  Overall, this function updates the **productInfo** state every time the user changes the value in the input element of the form, using the name of the input element as the key and the entered value as the value.

- ### [handleFileChange](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AddProducts.js#L48)

  **handleFileChange** is an event handler used to handle file input changes.

  First, it checks if there is a file in **event.target.files** and if the length is greater than 0. If so, the selected image is set to the first file in **event.target.files**.

  ```javascript
          if (e.target.files && e.target.files.length > 0) {
                  const selectedImage = e.target.files[0];
  ```

  Then, the **setProductInfo** function is used to update the **productInfo** state. **...productInfo** uses the spread operator to copy all the current values of **productInfo** into a new object. **image: selectedImage** adds or updates the value with the key '**image**' with the new value **selectedImage**.

  ```javascript
                  setProductInfo({ ...productInfo, image: selectedImage, });
          }
  ```

  Overall, this function updates the **productInfo** state every time the user changes the selected file in the form input element, using '**image**' as the key and the selected file as the value.

- ### [AddProducts.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AddProducts.js#L55)

  **AddProducts.js** is rendered by rendering a form(`<form>`) that allows the user to enter information about a new product. The form includes fields(`<input>`) such as product name, price, quantity in stock, meat type, and the ability to add a product image.

  When entering data into the form, the user input is tracked through the component state. The **handleInputChange** function updates the component state to reflect the entered data.

  The user can select a product image through the corresponding field(`<input type='file'>`). The **handleFileChange** function tracks the selected files and updates the component state with the selected image.

  When the user presses the "ADD" button(`<<button type='submit'>`), the **handleAddSubmit** function is triggered.

## 5. [AdminOrders.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminOrders.js)

<div align="right">

[Top](#meat-web-shop)

</div>

- **AdminOrders** is a component that displays a list of orders and allows for their preview.

- Defining variable states:

  - **adminOrd**: The adminOrd state is used to store order data.
  - **shouldRefetch**: The shouldRefetch state is used as a flag for re-fetching data from the server.
  - **message**: The message state is used to display messages to users.
  - **visibleOrders**: The visibleOrders state is used to track the visibility of individual orders.

- ### [toggleVisibility](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminOrders.js#L10)

  The **toggleVisibility** function enables toggling the visibility of an order. If the order is already visible, it is removed from the visibleOrders state. Otherwise, it is added to the end of the array.

  ```javascript
  const toggleVisibility = (orderId) => {
    if (visibleOrders.includes(orderId)) {
      setVisibleOrders(visibleOrders.filter((id) => id !== orderId));
    } else {
      setVisibleOrders([...visibleOrders, orderId]);
    }
  };
  ```

- ### [Implementation of useEffect](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminOrders.js#L18)

  **useEffect** is used for asynchronously fetching data from the server when the component **mounts** or when the **shouldRefetch** state changes. Then, the **fetchData** function is defined, which uses the **fetch API** to retrieve order data from the specified **URL**. Authorization is done using a **token** sent in the request header.
  If the fetch is successful (status code 2xx), the data is converted to **JSON format** and stored in the **adminOrd** state. Otherwise, an error is caught and logged to the console.

  ```javascript
  const fetchData = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_ADMIN_GET_ORDERS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      } else {
        const ordersData = await res.json();
        setAdminOrd(ordersData);
      }
    } catch (error) {
      console.error("Error Fetching data:", error);
    }
  };
  ```

- ### [AdminOrders.js Rendering](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminOrders.js#L43)

  **AdminOrders.js** component is rendered as follows:

  - **Title and Table Header:**

    - `<h1 style={{ padding: "1rem" }}>Orders</h1>`: Displays the title "Orders" with specific styling.
    - `<thead>` element: Defines the table header with column names such as "Num", "Buyer", "Date", and an empty column.

  - **Table Body (Tbody):**

    - `{adminOrd.slice().reverse().map((orderData, index) => (`: Maps through the array of orders (**adminOrd**), reverses it to
      display the latest orders at the top, and displays information about each order in table rows.
    - `<tr>` element: Displays a row for each order. The row color depends on the order status. If the order is in progress, the color is
      green. If the order is canceled, the color is red. Clicking on the row triggers the **toggleVisibility** function to
      change the visibility of the order details.
    - Order Details: If the order is marked as visible (`visibleOrders.includes(orderData._id)`), an additional row is displayed
      with the **AdminOrder** component that shows the order details.

  - **Table Footer (Tfoot):**

    - `<tfoot>` element: Defines the table footer with one row and an empty field.

  - **Message:**

    - `<div className={message ${message ? "visible" : "hidden"}}>`: Displays a div element with classes "message", depending on
      whether there is a message (**message**). If there is, it uses the "**visible**" class, otherwise "**hidden**".
    - `<button className="messageButton" onClick={() => setMessage("")}>`: A button to close the message that calls a function to
      set the message to an empty string.
    - `<p>{message}</p>`: Displays the content of the message.

  - **AdminOrder Component:**

    - <AdminOrder>: If the order detail is visible, the **AdminOrder** component is called with the appropriate props.

  ```javascript
  <AdminOrder
    orderData={orderData}
    setMessage={setMessage}
    toggleVisibility={() => toggleVisibility(orderData._id)}
    setShouldRefetch={setShouldRefetch}
    token={token}
  />
  ```

## 6. [AdminOrder.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminOrder.js)

<div align="right">

[Top](#meat-web-shop)

</div>

- **AdminOrder.js** is a component that displays order details and allows for accepting or rejecting the order.

  It requires five props:

  - **orderData**: contains information about the order ID.
  - **toggleVisibility**: controls the visibility of the order.
  - **setMessage**: sets the message state.
  - **setShouldRefetch**: sets the state of the variable for fetching orders from the server again.
  - **token**: contains the access token.

  First, the **orderData** is deconstructed into individual values.

  ```javascript
  const { _id, buyer, date, num, products, status } = orderData;
  ```

  Then, the **orderStatus** state is defined and set to the value of **status**.

  ```javascript
  const [orderStatus, setOrderStatus] = useState(status);
  ```

- ### [handleConfirm](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminOrder.js#L14)

  **handleConfirm** is a function that confirms the order.
  It defines a **response** within the **try** block that calls the **fetch** function with the **POST** method. The **headers** include the **token** for authentication, and the **body** includes the **\_id** as the order identification number.

  ```javascript
          method: "POST",
          headers: {
                  Authorization: `Bearer ${token.token}`,
                  "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: _id }),
  ```

  Then, it checks `if (response.ok) {}`. If the **if statement** is true, the following is executed:

  - `setOrderStatus(true);`
    - sets the **orderStatus** state to **true**, confirming the order.
  - `toggleVisibility(_id);`
    - closes the display of the open order.
  - `setMessage("Order number ${num} confirmed!");`
    - displays a message.
  - `setShouldRefetch(true);`
    - sets the **shouldRefetch** state to **true**, indicating that data should be fetched again.

  Otherwise, it checks `else if (response.status === 400) {}`. If this **if statement** is true, the following is executed:

  - `const errorResponse = await response.json();`
    - defines the error response.
  - `setMessage("Error: ${errorResponse.error}");`
    - displays the error as a message.

  If both **else if** statements are false, the final **else {}** statement is executed:

  - `setMessage("There was a problem, please try again.");`
    - sets the message.

  Finally, the **catch (error)** block is executed, which logs the **error** to the console.

- ### [Rendering AdminOrder.js](https://github.com/andrija-zikovic/Mesnica/blob/main/client/src/Admin/AdminOrder.js#L71)

  **AdminOrder.js** is rendered in a way that displays order details within a div element with the class "adminOrdDis".

  A close button for the order is rendered, and clicking on it invokes the toggleVisibility function.

  Inside the "adminOrdDis\_\_head" div element, customer data, date, and order number are displayed.

  - The customer's name is displayed within `<p>{buyer.name}</p>`.
  - The order date is displayed within `<p>{date}</p>`.
  - The order number is displayed within `<p>{num}</p>`.

  Inside the "adminOrdDis\_\_products" div element, details about the products in the order are displayed.
  The title "Products" is displayed as `<h2>`.
  For each product in the order, a div element with the class "product" is created.
  The product description is displayed within `<p>{product.description}</p>`.
  The product quantity is displayed within `<p>{product.quantity} kg</p>`.

  Depending on the order status **(true, false, or null)**, corresponding messages are displayed.

  - If the order is confirmed **(orderStatus === true)**, a message "Order Confirmed!" is displayed with a green background color `rgba(51, 178, 51, 0.75)`.
  - If the order is rejected **(orderStatus === false)**, a message "Order Rejected!" is displayed with a red background color `rgba(227, 53, 53, 0.801)`.
  - If the status is not defined **(orderStatus === null)**, buttons for confirming and rejecting the order are displayed inside the "adminOrdDis\_\_ButtonBottom" div element, and clicking on them invokes the **handleConfirm** and **handleReject** functions.

# Google Cloud deployment

<div align="right">

[Top](#meat-web-shop)

</div>

1. **New Project**

   First, I created My Project in the **Google Cloud** console and defined the project **ID**.

2. **Cloud Storage**

   After that, I created a new **bucket** and then created a **.json** file that I use in **[productsController.js](https://github.com/andrija-zikovic/Mesnica/blob/main/server/controllers/productsController.js#L54)** to define the **Storage**.

3. **gcloud deploy**

   Finally, I ran the deploy command through the terminal.
   `gcloud app deploy client/clientAppEngine.yaml server/serverAppEngine.yaml`

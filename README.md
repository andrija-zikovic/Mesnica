# Mesnica Web Trgovina

- ## [Frontend](#frontend-razvoj-s-reactom)          
     
- ### [Korisik](#korisnik)                          
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
    
- ### [Admin](#admin)                       
    1. [Admin.js](#1-adminjs)                  
    2. [AdminLogIn.js](#2-adminloginjs)        
    3. [AdminProducts.js](#3-adminproductsjs)  
    4. [AddProducts.js](#4-addproductsjs)      
    5. [AdminOrders.js](#5-adminorderjs)       
    6. [AdminOrder.js](#6-adminorderjs)        

- ## [Backend](#backend-razvoj-s-nodejs-i-express)
    
    1. [products.js / productsContorller.js](#productsjs--productscontorllerjs)
    2. [order.js / orderController.js](#orderjs--ordercontrollerjs)
    3. [form.js / formController.js](#formjs--formcontrollerjs)
    4. [login.js / logInController.js](#loginjs--logincontrollerjs)
    5. [logout.js / logoutController.js](#logoutjs--logoutcontrollerjs)
    6. [admin.js](#adminjs)

# O autor

Ovo je moji prvi samostalni projekt

Krajem 2022. doživio sam ozljedu(pad sa visine) na poslu koja mi je dala priliku 
i vrijeme da se počnem baviti programiranjem.

Započeo sam sa **Pythonom** s nekoliko tuturiala, ali nisam shvaćao šta radim i to mi je smetalo.
Nisam htio tipkati u prazno bez da razumijem šta se dešava ispod tih sintaksi koje pišem.

Potražio sam najbolji content na webu s kojim mogu naučiti dubinu programiranja i 
otkrio sam vrlo poznati **Harvardov CS50**, za mene tad velika nepoznanica.

Odmah mi se svidio jer je to najbliže fakultetskom predavanju od svih tuturial na koje sam naišao, zato što nije tuturial.

CS50 mi je pomogao da razumijem dubinu programiranja. Sad shvačam ulogu kompajlera, razumijem kako strojni jezik funkcionira,
te kako se zaista informacije prenose preko jedinica i nula. Upoznao me sa **SQL** bazom podataka i raznim metodama pretraživanja 
podataka(Bubble sort, Merge sort..).

Nakon CS50 sam se bacion na izradu prve web stranica s pythonom, flaskom i jinjom, tad sam se prvi put upoznao sa JavaScriptom 
koji sam koristio u html skriptama.

Nakon šta sam napravio sve šta sam htio s tom prvom web stranicom, osječao sam se nekako ograničeno u flasku. 

Mislio sam da je problem u frameworku, i odlučio sam naučiti **React** jer je on jedan od poznatijih.

Kroz React tuturial od Dave Graya na Youtubeu počeo sam shvačati kolike mi probleme nerazumijevanj CSS-s i HTML-a zadaje probleme
i usporava moji napredak. Stopirao sam učenje Reacta i posvetit sam se **HTML**-u i **CSS**-u.

U HTML-u sam se morao bolje upoznati s elementima i atributima koje želim koristit i koji su mi potrebni. 
A u CSS-u trebao sam naučiti kako kristit flex, grid i ostale stilove kako bi mogao postaviti i urediti elemente onako kako želim.

Nakon toga sam se spreman vratio na učenje Reacta. 

Kroz tuturial naučio sam kako se israđuju komponente, kako se koriste hooks useState, useEffect, kako se šalju svojstva(prop) kroz komponente, što je to prop driling i zašto nije dobro, useContext, useRef.

Stvarno mi se svidio React, osječao sam se kao da je sve moguće. Uvijek je sve bilo moguće, samo sam tek tad to shvatio.
Fascinantno je kako s tim malim uređajem s tipkovnicom u svom krili imaš neograničene mogućnosti. 
Kad gradiš kuću, moraš ići na stotine lokacije, kako bi rješavao probleme koji su vezani za tu kuću.
A u digitalnom svijet sve probleme riješavaš s jednog mjesta. Prelijepo.

Dok sam radio na ovoj web trgovini, došao sam do problema gdje sam morao nači rješenje za manipulaciju proizvodima.
Kako će vlasnik web trgovine izrađivati, mjenjati i uređivati proizvode. 

Logično rješenje je bilo nekakva baza podataka, ali nisam htio manipulirati bazom podataka s frontenda, pa je jedino 
rješenje bilo pozabaviti se s nekakvim backendom. Potražio sam koji je dobar javascript backend framework koji se koristi uz React.

Tad sam se upoznao s node.js-om. Odlučio sam se opet kroz tuturila naučiti osnove Node.js-a kako bi mogao zadovoljiti potrebe
web trgovine. 

# Backend Razvoj s Node.js i Express

## [SERVER](https://github.com/andrija-zikovic/react-mini-project/blob/main/server)

Prvi framework za **Node.js** s kojim sam se upoznao je "express", u ovom projektu koristim ga za definiranje URL ruta. 

Nakon izrade prvih ruta morao sam definirati credentials middleware kako mi mogao definirati koji url
ima pristup ovom serveru. Za to sam izradio dva filea, jedan u kojem definiram listu URLova koji će
imati pristup, a drugi je middleware koji provjerava dal je URL s kojeg dolazi request u listi URLova 
i daje dopuštenje za slanje kredencijala. Nakon toga koristim "cors" koji isto provjerava dal URL ima 
dopuštenje za slanje requesta.

## [products.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/routes/products.js) / [productsContorller.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/controllers/productsContorller.js) 

Izradio sam nekoliko ruta, prva je bila za slanje podataka o proizvodima ( url/products ). 

Kad se pristupi ruti, server obrađuje productsController koji iz mongoDB NoSQL baze podataka izvlači listu proizvoda

```javascript
[ {
    _id: ObjectId,
    title: String,
    price: Number,
    onStorage: Number,
    meatType: String,
    imgSrc: String
}]
```

i vraća kao response. 
Za izvlačenje podataka s **mongoDB** koristim **"mongoose"** s kojim se spajam na bazu 
podataka, i izrađivanje **Schema** pomoću kojih definiram šta želim izvući iz baze podataka.

## [order.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/routes/order.js) / [orderController.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/controllers/orderController.js)  

Sljedeće ruta ( url/order ) obrađuje naruđbu. Kad se pristupi ruti server obrađuje orderController.

orderController s podacima koje dobiva kroz request, izrađuje QR kod koji prenosi informacije :
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
RAČUN BR ${nextInvoiceNumber}
}
```

Skeniranjem QR koda, ispunjuju se potrebni podaci za plačanje unutra bankovne aplikacije.

Zatim kontroler isto tako s **"easyinvoice"** izrađuje PDF file. Kad je PDF file izrađen, orderController zove 
emailSander fukciju koja koristi **"nodemailer"** za slanje emaila kupcu s PDF fileom u privitku. 

Kad je email poslan orderController sprema naruđbu u mongoDB bazu podataka.

## [form.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/routes/form.js) / [formController.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/controllers/formController.js) 

Ruta ( url/form ) obrađuje formController 

koji kroz request dobiva (name, email, message), zatim s "nodemailer" šalje email s dobivenim informacija na email trgovine.

## [login.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/routes/login.js) / [logInController.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/controllers/logInController.js) 

Ruta ( url/login ) obrađuje logInController 

koji kroz request dobiva ( username, password ). logInController u mongoDB bazi podataka traži username 
```javascript 
    const foundUser = await User.findOne({ username });
```
ako ne nađe username koji je isti kao dobiven username vraća negativni response.

Ako pronađe username koji je isti kao dobiven username, provjerava dal se passwordi podudaraju, za to koristi **"bycrypt"**
```javascript
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
```
ako se ne podudaraju vraća negativan response.

Ako se podudaraju. logInController s **"jesonwebtoken"** kreira accessToken i refreshToken, refreshToken sprema u bazu podataka i vraca ga kroz cookie, a accesToken vraca kao json.
```javascript
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });
```

## [logout.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/routes/products.js) / [logoutController.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/controllers/logoutController.js)

Ruta **url/logout** obrađuje logoutController 

koji provjerava dal je kroz cookie poslan JWT.
```javascript
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); 
    const refreshToken = cookies.jwt;
```
Ako je JWT poslan, u bazi podataka traži Usera s tim JWT. Kad ga nađe, briše JWT iz baze podataka tog usera.
```javascript
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    foundUser.refreshToken = '';
    const result = await foundUser.save();
``` 
Zatim vraća prazan cookie i pozitivan response.
```javascript
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
```

# [admin.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/routes/api/admin.js)

Preko **url/admin**  rute obrađuju se svi zatjevi vezani za admina. CRUD operacije vezane za proizvode, prihvacanje i odbijanje naruđbi.

- [**url/admin/products**](#urladminproducts)
- [**url/admin/orders**](#urladminorders)
- [**url/admin/orderConfirme**](#urladminorderconfirme)
- [**url/admin/orderReject**](#urladminorderreject)


## url/admin/products

Ruta url/admin/products prihvaca četiri vrste zahtjeva, GET, POST, PUT, DELETE.

```javascript
    router.route('/products')
    .get(productsController.getAllProducts)
    .post(productsController.createProduct)
    .put(productsController.changeProducts)
    .delete(productsController.deleteProduct);
```

Sve vrste zahtjeva obrađuju productsController.

### [productsController.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/controllers/productsController.js)

Preko **GET** zahtjeva productsController izvršuje getAllProducts funkciju koja preko [server/model/Products.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/model/Products.js) 
iz mongoDB baze podataka izvlači informacije o svim proizvodima, i vraća listu proizvoda kao response.
```javascript
    try {
        const products = await Products.find();
        if (products < 1) {
            return res.status(204).json({ 'message': 'No products found.' });
        }
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
```

Preko **POST** zahtjeva productsController izvršuje createProduct funkciju koja s **@google-cloud/storage** configurira cloud storage.
```javascript
    const { Storage } = require('@google-cloud/storage');

        const storage = new Storage({
            projectId: 'mesnica02',
            keyFilename: '/workspaces/react-mini-project/server/config/mesnica02-f5b8d956119e.json'
        });
```
Zatim iz zahtjeva uploada sliku, pomoću **sharp** mjenja velićinu slike na 600x400px, i sprema ju kao buffer. 
```javascript
    const resizedImageBuffer = await sharp(imagePath)
        .resize(600, 400)
        .toBuffer();
```
Potom sprema sliku u definirani cloud storage,
```javascript
    await storage.bucket(bucketName).file(uploadOptions.destination).save(resizedImageBuffer, {
            metadata: uploadOptions.metadata,
            predefinedAcl: uploadOptions.predefinedAcl,
        });
```
i sprema ostale podatke is zahtjeva skupa s URL-om spremljene slike u bazu podataka.
```javascript
    const product = await Products.create({
            title: req.body.title,
            price: req.body.price,
            onStorage: req.body.onStorage,
            meatType: req.body.meatType,
            imgSrc: imgSrc
        });
```

Preko **PUT** zahtjeva productsController izvršuje changeProducts funkciju koja iterira kroz zahtjev, 
i azurira proizvode iz baze podataka sa stavkama iz zahtjeva.
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

Preko **DELETE** zahtjeva productsController izvršuje deleteProduct funkciju
koja kroz zahtjev dobiva ID proizvoda, i zatim iz baze podataka briše proizvod sa dobivenim ID-om.
```javascript
    const deletedProduct = await Products.deleteOne({ _id: id });
    
        if (!deletedProduct) {
          
          return res.status(404).json({ error: 'Product not found' });
        }
```

## [orderController.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/controllers/orderController.js)

Ovaj kontroler se izvršava preko tri rute:

- url/admin/orders
- url/admin/orderReject
- url/admin/orderConfirme

```javascript
    router.route('/orders')
        .get(orderController.getOrders);

    router.route('/orderConfirm')
        .post(orderController.orderConfirm);

    router.route('/orderReject')
        .post(orderController.orderReject);
```

### url/admin/orders

url/admin/orders ruta izvršava **getOrders** funkciju unutar [orderController.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/controllers/orderController.js)

**getOrders** funkcija koristi [Orders.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/model/Orders.js) **mongoose.Schema** model za izvlačenje informacija iz mongoDB baze podataka.
Zatim ih vraća kroz response kao json.

```javascript
    const ordersData = await orders.find();
    if (orders < 1) {
        return res.status(204).json({ message: "No orders found." });
    }
    res.json(ordersData);
```

### url/admin/orderConfirme

url/admin/orderConfirme ruta izvršava **orderConfirm** funkciju unutar [orderController.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/controllers/orderController.js)

**orderConfirme** funkcija kroz zahtjev dobiva ID naruđbe u bazi podataka.

Pomoću dobiveno ID-a funkcija traži određenu naruđbu unutar baze podataka i ažurira njezin status u **{ status: true }**.

```javascript
    const existingOrder = await orders.findById(id);

    if (existingOrder.status === true) {
        return res.status(400).json({ error: 'Order is already confirmed' });
    }

    await orders.findByIdAndUpdate(id, { $set: { status: true } }, { new: true });
    res.status(200).json({ message: 'Order confirm!'});
```

### url/admin/orderReject

url/admin/orderReject ruta izvršava **orderConfirme** funkciju unutar **[orderController.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/controllers/orderController.js)**

**orderReject** funkcija funkcionira isto kao **orderConfirme** samo što umjestio { status: true } ona ažurira status u **{ status: false }**.

```javascript
    const existingOrder = await orders.findById(id);

    if (existingOrder.status === true) {
        return res.status(400).json({ error: 'Order is already rejected' });
    }

    await orders.findByIdAndUpdate(id, { $set: { status: false } }, { new: true });
    res.status(200).json({ message: 'Order rejected!'});
```

# Frontend Razvoj s Reactom

# Korisnik

Glavni ulazni dio React aplikacije je **App.js**.

## [App.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/App.js)

Unutar App.js uvoze se dvoje komponente [Client.js](#client.js) i [Admin.js](#admin.js) te se definiraju rute za svako komponentu.

```javascript
    function App() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='*' element={<Client />} />
                    <Route path='admin/*' element={<Admin />} />
                </Routes>
            </BrowserRouter>
        );
    }
```
- **BrowserRouter** omotava cijelu aplikacije kako bi omogućiti korištenje React Router-a.
- **Routes** definira rute unutar aplikacije.
- **Route** elementi definiraju koje komponente trebaju biti prikazani ra određenu rutu.

# Korisnička strana
[Top](#frontend){style="text-align: right;"}
## 1. [Client.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Client.js)

Unutar **Client.js** komponente, definira se **cartItems** sa **useState()** hookom u koji ćemo dodavati informacije o proizvodima,
koje user želi kupiti.

```javascript
    const [cartItems, setCartItems] = useState([]);
```

- Definiraju se jos četiri funkcije:
    -   [deleteItem](#deleteitem)
    -   [clearCart](#clearcart)
    -   [calculateQuantity](#calculatequantity)
    -   [handleAmountChange](#handleamountchange)

- ### [deleteItem](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Client.js#L15)

**deleteItem** funkcija uzima **itemId** parametar koji koristi kao identfikator, zatim s tim identifikator filtrira kroz **cartItems** i
stvara novu listu proizvoda bez identificiranog itema unutar **cartItems**.
Nakon što je izradila novu listu, ažurira **cartItems** s novom listom.

```javascript
    const deleteItem = (itemId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
    };
```

- ### [clearCart](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Client.js#L20)

**clearCart** funkcija ažurira **cartItems** s praznom listom.

```javascript
    const clearCart = () => { setCartItems([]); };
```

- ### [calculateQuantity](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Client.js#L24)

**calculateQuantity** funkcija uzima dva parametra **newAmount** i **selectedUnit**, ako je vrijednost **selectedUnit** "kg" onda 
funkcija vraća vrijednost **newAmount**. U suprotnom funkcija vraća vrijednos **newAmount** podjeljenu sa 100 što bi u suštini 
trebalo vratit vrijednost u dekagramima.

```javascript
    const calculateQuantity = (newAmount, selectedUnit) => {
        if (selectedUnit === "kg") {
            return newAmount;
        } else {
            return newAmount / 100;
        }
    };
```

- ### [handleAmountChange](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Client.js#L32)

**handleAmountChange** funkcija uzima sedam parametara :

- **operation** : može biti "increment" ili "decrement", funkcija je koristi kako bi znala dal user želi smanjiti ili povećati količinu.
- **id** : idetifikacijski broj proizvoda
- **title** : naziv proizvoda.
- **price** : cijena proizvoda.
- **selectedUnit** : može biti "kg" ili "dag".
- **amount** : količina.
- **setAmount** : funkcija unutar **useState** za ažuriranje količine.

Funkcija prvo definira **incrementValue**, ako je **selectedUnit = "kg"** onda **incrementValue = 1**, u suprotnom **incrementValue = 10**. Ova veriabla određuje dal se radi o kilogramima ili dekagramima.

Zatim se definira nova količina **newAmount** tako što se gleda vrijednos **operation** parametra, ako je njegova vrijednost "increment" onda se zbrajaju **amount + incrementValue**, u suprotnom se oduzimaju.

Ako je **newAmount** veći ili jednak broju jedan, izvršava se **setAmount(newAmount)** kako bi se ažurirala nova vrijednost količine **amount**.

Zatim se unutar toga "if statement" definira proizvod u ovom slučaju **item** sa svim dobivenim parametrima

```javascript
    const item = {
        "id": id,
        "description": title,
        "price": price,
        "tax-rate": 5,
        "quantity": calculateQuantity(newAmount, selectedUnit),
        "unit": selectedUnit,
    };
```
i izvršavam još jedan "if statement" s kojim provjeravamo dal se nešto nalazi unutar **cartItems**.

Ako je **cartItems** prazan, ažuriramo ga s definiranim proizvodom.
```javascript
    if (cartItems.length === 0) { setCartItems([item]); }
```
U suprotnom unutar **cartItems** tražimo index proizvoda koji ima isti identifikacijski broj kao **id** parametar.
```javascript
const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === id);
```
Ako dobiveni index nije -1, znači da taj proizvod postoji unutar **cartItems**. Zatim se izrađuje nova lista unutar koje se ažurira **item**
s navedenim indexom i ažurira se cijeli **cartItems**.
```javascript
    if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex] = item;
        setCartItems(updatedCartItems);
    }
```
U suprotnom dodajemo **item** kao novi proizvod unutar **cartItems**.
```javascript
    setCartItems([...cartItems, item]);
```
A ako je **newAmount** manji od 1, znači da taj proizvod nema nikakvu količinu i samim time nam više nije potreban, pa izrađujemo novu listu starih proizvoda bez navedenog i ažuriramo **cartItems** s novom listom.
```javascript
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== id);
    setCartItems(updatedCartItems);
    setAmount(0);
```

- ### [Client.js Renderiranja](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Client.js#L72)

    Nakon što su definiran funkcije, komponenta vraća strukturu elemenata i ostalih komponenata.

    - **Nav** : navigacijska traka.
    - **Header** : vrh stranice.
    - **Home** : prva stranica.
    - **Products** : stranica proizvoda.
    - **AboutUs** : "O nama" stranica.
    - **OrderForm** : stranica za ispunjavanje obrasca za naruđbu.
    - **Footer** : dno stranice:

    ```javascript
        return (
            <div className='client'>
                <Nav cartItems={cartItems} setCartItems={setCartItems} deleteItem={deleteItem} clearCart={clearCart} />
                <Header title={'Mesnica'} />
                <Routes>
                    <Route path='/' element={<Home handleAmountChange={handleAmountChange} />} />
                    <Route path='/products' element={<Products handleAmountChange={handleAmountChange} />} />
                    <Route path='/about-us' element={<AboutUs />} />
                    <Route path='/order' element={<OrderForm cartItems={cartItems} setCartItems={setCartItems} deleteItem={deleteItem} clearCart={clearCart} />} />
                </Routes>
                <Footer />
            </div>
        )
    ```

## 2. [Nav.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Nav.js)     [Top](#frontend){style="float: right;"}

- **Nav.js** komponenta je komponenta u stilu navigacijske trake, zahtjeva četiri parametra koja prosljeđuje u **Bucket** komponent.

    Nav komponenta prvo definira **useState** pomoću kojeg se definira prikazivanje **Bucket** komponente.
    ```javascript
            const [isBucketVisible, setIsBucketVisible] = useState(false);
    ```
- Zatim se definira **[toggleBucketVisibility](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Client.js#L10)** 
    funkcija koja ažurira vrijednost **isBucketVisible** u suprotnu vrijednos njegove trenutnevrijednosti. 
    **false -> true** | **true -> false**
```javascript
        const toggleBucketVisibility = () => { setIsBucketVisible((prevState) => !prevState); };
```
- ### [Nav.js Renderiranja](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Nav.js#L14)
    **Nav.js** komponenta renderira "unorder list" s linkovima, gumbom za prikazivanje košarice i **Bucket** komponentom
    ```javascript
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
    ```
## 3. [Bucket.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Bucket.js)     [Top](#frontend){style="float: right;"}

- **Bucket.js** komponeta prikazuje proizvode koje je kupac odabrao kupiti. Zahtjeva četiri parametra:

    - **cartItems**
    - **deleteItems**
    - **clearCart**
    - **toggleBucketVisibility**

    Prvo se definira se funkcija **calculateTotalPrice**.

- ### [calculateTotalPrice](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Bucket.js#L7)

    **calculateTotalPrice** funkcija izračunava ukupnu cijenu svih proizvoda tako što koristi **reduce** funkciju koja iterira kroz
    **cartItems** i za svaki item množi **quantity * price** te ih zbraja u **total**.   

    ```javascript
        const calculateTotalPrice = () => {
            const totalPrice = cartItems.reduce((total, cartItem) => {
                return total + cartItem.quantity * cartItem.price;
            }, 0);

            return totalPrice.toFixed(2); // Rounds to two decimal places
        };
    ```

    Zatim renderira **totalPrice** tako što ga ograniči na dvije decimale.
    ```javascript
        return totalPrice.toFixed(2);
    ```

- ### [Bucket.js Renderiranja](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Bucket.js#L15)

    **Bucket.js** vraća na dva načina :

    - **Prazna košarica (if (cartItems.length < 1) {..})**

    Provjera stanje **cartItems**, ako dužina **cartItems.length < 1** što bi značilo da je **cartItems** prazan, onda renderira element
    s tekstom koji obavještava kupca da je košarica prazna.
    ```javascript
        return (
                <section className='bucket'>
                    <p style={{ textAlign: 'center' }}>Vaša košarica je prazna!</p>
                </section>
            )
    ```

    - **Košarica s proizvodima (else {..})**

    U suprotnom renderira elemente koji prikazuju tablicu s proizvodima, pojedinačnom količinom, cijenom i dugmom za brisanje proizvoda, 
    te ukupnom cijenom, i dugmima za naručivanje i čisćenje košarice.

    Tablica se prikazuje na način da se iterira kroz **cartItems** i za svaki item se prikazuje red u tablici s informacijama toga itema i dugmom za uklanjanje proizvoda iz **cartItems**.
    ```javascript
    <tbody className='bucket__tbody'>
        {cartItems.map((cartItem, index) => (
            <tr key={index}>
                <td>{cartItem.description}</td>
                <td>
                    {cartItem.quantity} {cartItem.unit}
                </td>
                <td>
                    {parseFloat(cartItem.quantity * cartItem.price).toFixed(2)}{' '}€
                </td>
                <td><button className='delete' onClick={() => deleteItem(cartItem.id)}><svg xmlns="http://www.w3.org/2000/svg" height="0.7em" viewBox="0 0 384 512"></svg></button></td>
            </tr>
        ))}
    </tbody>
    ```

## 4. [Header.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Header.js)     [Top](#frontend){style="float: right;"}

- **Header.js** je komponenta koja prikazuje vrh stranice. 
    Zahtjeva jedan parametar, cija se vrijednost prikazuje unutar elementa.
    ```javascript
        const Header = ({ title }) => {
            return (
                <header className='header'>
                    <h1 className='header__h1'>{title}</h1>
                    <p>SINCE 1923.</p>
                </header>
            )
        }
    ```

## 5. [Home.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Home.js)     [Top](#frontend){style="float: right;"}

**Home.js** je komponenta koja prikazuje prvu stranicu. Zhatjeva jedan parametar koji prosljeđuje drugom elementu.

- ### [Home.js Renderiranje](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Home.js#L9)

    Renderira tri komponente:

    - **Hero**
    - **ProductList**
    - **About**

    unutar main elementa.
    ```javascript
        return (
            <main className='home'>
            <Hero />
            <h2 className='prducts-list__h2'>TOP SELLERS</h2 >
            <ProductsList handleAmountChange={handleAmountChange} meatType={''} host={'home'} />
            <About />
            </main>
        )
    ```

## 6. [Hero.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Hero.js)     [Top](#frontend){style="float: right;"}

**Hero.js** je komponenta koja se na početnoj stranici prikazuje ispod **Header.js** komponente.
Prikazuje sliku s dodatnom animiranom naljepnicom "Dobrodošli".

- ### [Hero.js Renderiranja](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Hero.js#L6)
    ```javascript
        const Hero = () => {
            return (
                <section className='hero'>
                    <h2 className='hero__h2' loading="lazy">Dobrodošli</h2>
                    <figure>
                        <img src={myImage} alt='hero.jbg' width="1954" height="644" />
                        <figcaption className='offscreen'>
                            Meat on plate
                        </figcaption>
                    </figure>
                </section>
            )
        }
    ```

## 7. [ProductsList.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/ProductsList.js)     [Top](#frontend){style="float: right;"}

- **ProductsList.js** zahtjeva 3 parametara:

    - **handleAmountChange**
    - **meatType**
    - **host**

    i definira dva **useState**, jedna za ažuriranje stanja proizvoda, a drugi za ažuriranje lise proizvoda.
    ```javascript
        const [noProductsCheck, setNoProductsCheck] = useState(false);
        const [products, setProducts] = useState([]);
    ```
    Zatim s **useEffect** hook-om kroz **fetch** fukciju povlači listu proizvoda s definiranog URL-a.
    Ako je status responsa negativan, ažurira **noProductsCheck** s **true** vrijednosit. 
    A u suprotnom ako je response pozitivan, ažurira **products** s dobivenom listom proizvoda.
    ```javascript
        const baseUrl = process.env.REACT_APP_PRODUCTS_CALL_API;

        const url = baseUrl + meatType;

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Network response was not ok')
        }

        if (res.status === 204) {
            setNoProductsCheck(true);
        } else {
            const productsData = await res.json();
            setProducts(productsData);
            setNoProductsCheck(false);
        }
    ```

- ### [ProductsList.js Renderiranja](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/ProductsList.js#L35)     [Top](#frontend){style="float: right;"}

    Ako je **noProductsCheck** pozitiven vrijednosti **true**, šta bi znacilo da nema povucenih proizvoda sa servera.

    Vraća se element s tekstom koji informira kupca kako nema proizvoda. To se desava u slučaju ako definirani **meatType**
    nije postojeći u bazi podataka.
    ```javascript
        if (noProductsCheck) {
            return (
                <h2 style={{ textAlign: 'center', marginTop: '25vh' }}>Nema proizvoda!</h2>
            )
        }
    ```

    U suprotnom se vraća element koji u sebi iterira kroz dobivenu listu proizvoda na dva načina:

    Ako je **host='home'** šta bi značilo da se **ProductsList** prikazuje u **Home** komponenti, lista proizvoda se ograničava
    na 4 proizvoda s **slice** funkcijom i iterira kroz ta četiri proizvoda s **map** funkcijom. Za svaku iteraciju prikazuje se 
    **ProductCard** komponenta kojoj se prosljeđuju parametri iz te iteracije.
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
    U suprotnom se iterira se kroz sve proizvode.
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
        ))
    ```

## 8. [About.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/About.js)     [Top](#frontend){style="float: right;"}

**About.js** je komponenta koja renderira **<section>** element unutar kojeg su nekoliko **<article>** elemenata
koji prikazuju tekst o mesnici.
```javascript
        <section className='about'>
        <article className='about_article'>
            <h2>Stogodisnja tradicija!</h2>
            <img src={Mesnica1987} width='736px' height='486px' alt='1987' className='about_article01_img'/> 
            <h2>Od 1923.!</h2>
        </article>
        </section> 
```

## 9. [Products.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Products.js)     [Top](#frontend){style="float: right;"}

- **Products.js** je roditeljska komponenta, dvim komponentima:

    - **[SideNav](#10-sidenavjs)** : navigacijska traka.
    - **[ProductsList](#7-productslistjs)** : lista proizvoda.

    koja zahtjeva jedan parametar :

    - **[handleAmountChange](#handleamountchange)**

    i definira **useState** za kontroliranje prikaza određene vrste mesa.
    ```javascript
        const [meatType, setMeatType] = useState('');
    ```

- ### [Products.js Renderiranja](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Products.hs.js#L8)
    ```javascript
        return (
            <main className='products'>
            <SideNav setMeatType={setMeatType}/>
            <ProductsList handleAmountChange={handleAmountChange} meatType={meatType} host={''} />
            </main>
        )
    ```

## 10. [SideNav.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/SideNav.js)     [Top](#frontend){style="float: right;"}

**SideNav.js** je komponenta koja zahtjeva jedan parametar:

- **setMeatType** : ažuriranje prikaza vrste mesa.

I definira jednu funkciju **[handleMeatTypeChange](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/SideNav.hs.js#L4)** koja zahtjeva jedan parametar 
i koristi **setMeatType** za ažuriranje **meatType** navedenim parametrom.
```javascript
    const handleMeatTypeChange = (type) => { setMeatType(type); };
```

- ### [SideNav.js Renderiranja](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/SideNav.hs.js#L8)
    **SideNav.js** renderira listu pojmova, koji na odabir izvršavaju **handleMeatTypeChange** dodajući pojam kao parametar.
    Primjer jednog pojma:
    ```javascript
        <li className='sideNav__li' onClick={() => handleMeatTypeChange('piletina')}>
            <p className='sideNav__p'>Piletina</p>
        </li>
    ```

## 11. [AboutUs.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/AboutUs.js)     [Top](#frontend){style="float: right;"}

**AboutUs.js** je komponenta koja istovremeno prikazuje informativni tekst o mesnici, dinamičnu listu slika koje se neprekidno 
izmjenjuju, i omogućava korisnicima da jednostavno pošalju poruku putem dostupnog obrasca.

Prvo, definira **useState** varijablu koja sadrži tri **key: value** para.
```javascript
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
```
- Zatim, definira se funkcija **[handleInputChange](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/AboutUs.js#L11)** 
    Koja prima **event** kao parametar. Iz tog eventa izvlači se njegovo **name** i **value**,
    nakon čega ažurira stanje **formData**, postavljajući novo **value** za odgovarajući **key** unutar trenutnog stanja.
    ```javascript
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };
    ```
- Nakon toga se definira **[handleSubmit](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/AboutUs.js#L16)** 
    funkcija koja prvo sprječava osnovno ponašanje obrasca (default behavior) pozivom **e.preventDefault()**. 
    Zatim šalje **POST** zahtjev na **API** s podacima iz **formData**. 
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
    Ako odgovor bude uspješan, resetira obrazac i prikazuje API odgovor u konzoli. Ako odgovor nije uspješan, hvata grešku i 
    prikazuje je u konzoli.

    Nakon toga, stvara se kontekst slika koji zahtijeva sve slikovne datoteke unutar **public/img** foldera, a zatim se stvaraju 
    polje slika i stanje za praćenje trenutnog indeksa slike. 
    ```javascript
        const imageContext = require.context(
            "/public/img",
            false,
            /\.(jpg|jpeg|png)$/
        );

        const images = imageContext.keys().map(imageContext);

        const [currentIndex, setCurrentIndex] = useState(0);
    ```

    - Na kraju, koristi se useEffect da se automatski mijenja indeks slike svakih 10 sekundi.
    ```javascript
        useEffect(() => {
            const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 10000);

            return () => clearInterval(interval);
        }, [images.length]);
    ```
- ### [AboutUs.js Renderiranja](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/AboutUs.js#L65)

    Komponenta **AboutUs.js** implementira ključne elemente za prikaz informacija o Mesnici na web stranici. 
    Struktura komponente uključuje:
    - **Glavni Element (`<main>`):**
        - Postavljen s klasom "aboutUs".
        - Djeluje kao osnovni kontejner za sve informacije vezane uz Mesnicu. 
    - **Sekcije (`<section>`):** 
        - Različite sekcije unutar glavnog elementa, svaka fokusirana na određeni aspekt mesnice.
        - Ove sekcije organiziraju informacije na web stranici i olakšavaju korisnicima pronalazak specifičnih podataka.
    - **Članci (`<article>`):**
        - Svaka sekcija sadrži članke koji pružaju tekstualne opise.
        - Tekst unutar članaka opisuje različite aspekte Mesnice, uključujući povijest, kvalitetu, asortiman proizvoda te poziv za posjetu.
    - **Sustav za Izmjenu Slika:**
        - Unutar određenih članaka postavljen je sustav koji dinamički izmjenjuje slike.
        - Ovaj vizualni element pridonosi atraktivnosti stranice i pomaže u boljem predstavljanju atmosfere Mesnice.
    - **Sekcija s Formom za Kontakt (`<form>`):**
        - Zadnja sekcija sadrži formu za kontaktiranje Mesnice.
        - Forma ima polja za unos imena, emaila i poruke te gumb za slanje.
        - Obrada podataka iz forme izvršava se pomoću funkcije handleSubmit.

    Ova struktura omogućuje korisnicima da istraže različite aspekte Mesnice, vizualno dožive atmosferu putem dinamičnih slika te jednostavno
    stupe u kontakt s mesnicom putem obrasca. Komponenta pridonosi organiziranom i privlačnom prikazu informacija o Mesnici na web stranici

## 12. [orderForm.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/orderForm.js)     [Top](#frontend){style="float: right;"}

- **orderForm.js** je komponenta odgovorna za prikaz obrasca za naručivanje proizvoda. 
    Ova komponenta omogućuje korisnicima
    da ispune obrazac o svojim informacijama i pošalju naruđbu sa prije dodanim proizvodima.
    Zahtjeva tri parametra:
    - **cartItems** 
    - **deleteItem**
    - **clearCart**
    Komponenta koristi useState za praćenje statusa kupnje (da li je narudžba uspješna), a također koristi useRef za referencu na formu.
    ```javascript
        const [buyStatus, setBuyStatus] = useState(false);
        const formRef = useRef(null);
    ```
- ### [handleSubmit](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/orderForm.js#L8)
    Nakon toga se definira funkcija **handleSubmit** koja obrađuje podatke za slanje narudžbe. handleSubmit 
    koristi **event.preventDefault():** za spriječavanje osnovnog ponašanja obrasca, čime se spriječava ponovno učitavanje 
    stranice prilikom slanja obrasca. 
    Za dohvaćanje podataka iz forme koristi se **FormData** objekt za dohvaćanje podataka iz forme. **formRef.current** 
    predstavlja referencu  na HTML formu.
    ```javascript
        event.preventDefault();
        const formData = new FormData(formRef.current);
    ```
    Zatim se popunjavanje se objekt **formValues** na način da se podaci iz forme iteriraju, a polja imena **(fname)**, prezimena **(lname)** 
    se spajaju u jedno polje **company**. Ostali podaci se direktno dodaju u **formValues** objekt.
    ```javascript
        const formValues = {};
        formData.forEach((value, key) => {
            if (key === 'fname' || key === 'lname') {
                formValues['company'] = `${formData.get('fname')} ${formData.get('lname')}`;
            } else {
                formValues[key] = value;
            }
        });
    ```

    Na kraju se poziva **handleOrderSend** funkcija s proizvodima iz košarice(**cartItems**) i podacima o kupcu(**formValues**).
    ```javascript
        handleOrderSend(cartItems, formValues);
    ```
- ### [handleOrderSend](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/orderForm.js#L25)

    **handleOrderSend** funkcija je ključna funkcija za slanje narudžbe na server.

    Prvo se definira URL iz environmenta, zatim se koristi **fetch** za slanje **POST** zahtjeva na definirani **URL**.  
    U zaglavljima se postavlja **Content-Type** na **application/json**, a tijelo zahtjeva se postavlja na **JSON** reprezentaciju 
    objekta s proizvodima iz košarice (**cartItems**) i podacima o kupcu (**buyerData**).
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
    Zatim se provjerava da li je **HTTP** odgovor uspješan (**status kod 200**). Ako je odgovor uspješan, tada se postavlja 
    **buyStatus** na **true** (označava uspješno slanje narudžbe), brišu se svi proizvodi iz košarice i ispisuje poruka o uspješnom slanju
    narudžbe. 
    ```javascript
        if (res.ok) {
            setBuyStatus(true);
            clearCart();
            const data = await res.json();
            console.log(data.message);
        }
    ```
    Ako dođe do problema tijekom slanja narudžbe (npr. problemi s mrežom ili odgovor s neuspješnim statusom), 
    uhvaćena je greška i ispisana je u konzoli.
    ```javascript
        catch (err) {
            console.error('Error giving order:', err)
        }
    ```
- ### [calucalteTotalPrice](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/orderForm.js#L48)
    **calculateTotalPrice** funkcija koristi se za izračunavanje ukupne cijene proizvoda u košarici, uzimajući u obzir količinu i cijenu 
    svakog pojedinog proizvoda.

    Prvo se definira varijabla totalPrice i postavlja na početnu vrijednost 0. Ova varijabla će se koristiti za akumuliranje ukupne cijene 
    proizvoda u košarici. Zatim se koristi **reduce** metoda kako bi se iteriralo kroz sve proizvode u **cartItems** (košarici) i izračunala 
    ukupna cijena. Za svaki proizvod, količina (**cartItem.quantity**) se množi s cijenom (**cartItem.price**), a rezultat se dodaje na 
    trenutni zbroj (**total**).
    ```javascript
        const totalPrice = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price;
        }, 0);
    ```
    Na kraju se rezultat zaokružuje na dvije decimale pomoću **toFixed(2)**. Ovo osigurava da ukupna cijena bude prikazana s točno dvije decimale.
    ```javascript
        return totalPrice.toFixed(2);
    ```
- ### [orderForm.js Renderiranja](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/orderForm.js#L56)

    **orderFrom.js** se renderira na dva tri načina. Ovisno o uvjetu.

    - Prvi uvjet (**[if (buyStatus) {...}](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/orderForm.js#L56)**): 

        - Ako je buyStatus true, to znači da je narudžba uspješno poslana. Prikazuje se određeni dio JSX-a s porukom o 
        uspješnoj narudžbi.

    - Drugi uvjet (**[else if (cartItems.length < 1) {...}](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/orderForm.js#L68)**): 

        - Ako **buyStatus** nije true i dužina **cartItems** (proizvoda u košarici) je manja od 1, to znači da je košarica prazna. 
        Prikazuje se određeni dio JSX-a s porukom o praznoj košarici.

    - Treći uvjet (**[else {...}](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/orderForm.js#L74)**): 

        - Ako ni jedan od prethodnih uvjeta nije ispunjen, to znači da korisnik ima proizvode u košarici i nije poslao narudžbu. 
        Prikazuje se ostatak JSX-a koji prikazuje popis proizvoda u košarici, ukupnu cijenu, formu za unos podataka i gumbi za čišćenje 
        košarice i slanje narudžbe.

## 13. [Footer.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Client/Footer.js)     [Top](#frontend){style="float: right;"}

**Footer.js** je jednostavna komponenta koja renderira kontakt informacije i registrirani znak s nazivom mesnice i tekućom godinom.

# Admin

## 1. [Admin.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/Admin.js)     [Top](#frontend){style="float: right;"}

- **Admin.js** je komponenta koja predstavlja administratorsko sučelje.
        Prvo se definiraju stanja verijabli:
        - **isLoggedIn** prati je li administrator prijavljen ili nije.
        - **isDropdownOpen** koristi se za upravljanje stanjem padajućeg izbornika.
        - **token** sadrži autentikacijski token.
        - **message** se koristi za prikazivanje informativnih poruka.
        - **dropdownRef** je referenca na element padajućeg izbornika.
    ```javascript
            const [isLoggedIn, setIsLoggedIn] = useState(false);
            const [isDropdownOpen, setIsDropdownOpen] = useState(false);
            const [token, setToken] = useState('');
            const dropdownRef = useRef(null);
            const [message, setMessage] = useState("");
    ```

- ### [handleLogin](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/Admin.js#L18)

    **handleLogin** je asinkrona funkcija za obradu prijave administratora. 
    Prvo se definira **URL** iz **env**ironmenta, nakon toga se koristi **fetch** funkcija za slanje asinkronog **HTTP POST** zahtjeva prema 
    definiranom **URL**-u. Postavke zahtjeva uključuju method (POST), te **headers** i **body** koji se postavljaju kako bi se poslali **JSON**
    podaci s korisničkim imenom i lozinkom.
    ```javascript
        const url = process.env.REACT_APP_LOGIN;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
    ```
    Zatim **response.ok** provjerava je li **HTTP** odgovor uspješan (status kod 2xx). Ako jest, izvršava se blok koda unutar if izjave.
    **const { accessToken } = await response.json()** parsira **JSON** odgovor iz servera i dohvaća accessToken.
    **setToken(accessToken)** postavlja token u stanje komponente pomoću **setToken** funkcije.
    **setIsLoggedIn(true)** postavlja **isLoggedIn** na **true** kako bi označio da je administrator uspješno prijavljen.
    ```javascript
        if (response.ok) {
            const { accessToken } = await response.json();
            setToken(accessToken);
            setIsLoggedIn(true); 
        }
    ```
    Ako odgovor nije uspješan, koristi se **await response.json()** za parsiranje **JSON** odgovora s servera koji sadrži podatke o grešci.
    **setMessage(errorResponse.error)** postavlja poruku o grešci u stanje komponente pomoću **setMessage** funkcije.
    **console.error('Authentication failed')** ispisuje poruku o grešci u konzolu.
    ```javascript
        else {
            const errorResponse = await response.json();
            setMessage(errorResponse.error);
            console.error('Authentication failed');
        }
    ```
    Ova funkcija **handleLogin** integrira logiku prijave administratora, obrađujući različite scenarije uspjeha i neuspjeha tijekom 
    asinkronog procesa prijave prema određenom URL-u

- ### [logOut](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/Admin.js#L45)

    **logOut** funkcija obavlja logiku odjave administratora.

    **await fetch('/api/logout', { method: 'POST', ... })** koristi funkciju **fetch** za slanje **asinkronog HTTP POST zahtjeva prema '/api/logout'** endpointu na serveru. 
    
    Postavkom method: **'POST'** određuje se metoda zahtjeva za odjavu koristeći **HTTP** metodu **POST**. 
    Ova konfiguracija je bitna jer specifično ukazuje na namjeru izvršavanja odjave. Također, opcija 
    **credentials: 'include'** odabire se kako bi se osiguralo da se kredencijali, u ovom slučaju 
    **kolačići (cookies)**, automatski uključe u zahtjev. Ovo je od krucijalne važnosti pri radu s autentikacijom putem kolačića. 
    
    Kada je postavljeno na **'include'**, osigurava se automatsko uključivanje kolačića u svaki zahtjev, 
    pružajući potrebne informacije za odjavu. 
    Nadalje, **headers: { 'Content-Type': 'application/json' }** postavlja zaglavlje zahtjeva kako bi se naznačilo da se šalju podaci u 
    **JSON formatu**. Ova konfiguracija osigurava da su podaci o odjavi strukturirani kao JSON, pridržavajući odgovarajuće standarde pri 
    komunikaciji s serverom.
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
    Nakon toga, **response.ok** se koristi za provjeru je li **HTTP** odgovor uspješan, odnosno ima li **status kod 2xx**. 
    Ako jest, slijedi izvršavanje bloka koda unutar **if** izjave. 
    U tom slučaju, **setIsLoggedIn(false)** postavlja vrijednost **isLoggedIn** na *false*, što označava da je administrator 
    uspješno odjavljen. Osim toga, **console.log('Logout successful')** ispisuje poruku o uspješnoj odjavi u 
    konzolu, pružajući potvrdu o nesmetanom procesu odjave.
    ```javascript
        if (response.ok) {
            setIsLoggedIn(false);
            console.log('Logout successful');
        } else {
            console.error('Logout failed');
        }
    ```
    **catch (error)**: Uhvaćene su sve vrste pogrešaka koje se mogu pojaviti tijekom izvršavanja funkcije. 
    **console.error('Error during logout:', error)**: Ispisuje poruku o grešci u konzolu koristeći console.error
    ```javascript
        } catch (error) {
            console.error('Error during logout:', error);
        }
    ```
    Ova funkcija **logOut** integrira logiku odjave administratora, obrađujući različite scenarije uspjeha i neuspjeha tijekom asinkronog 
    procesa odjave prema **'/api/logout'** endpointu.

- ### [toggleDropdown](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/Admin.js#L66)
    Ova funkcija mjenja stanje **isDropdownOpen** u njegovu trenutnu suprotnost. Ako je trenutno stanje **false**, nakon ovog izraza stanje se 
    mjenja u **true**.
    ```javascript
        const toggleDropdown = () => {
            setIsDropdownOpen(!isDropdownOpen);
        };
    ```

- ### [handleOutsideClick](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/Admin.js#L70)
    Ova funkcija **handleOutsideClick** služi za zatvaranje padajućeg izbornika kada korisnik klikne izvan njega.
    **dropdownRef.current** prati postojanje referenca (**current**) na prethodno postavljeni **DOM element** pomoću **useRef**. 
    
    Ako ta referenca postoji, slijedi dodatna provjera. **e.target** označava element na koji je korisnik kliknuo, 
    odnosno element koji je pokrenuo događaj klika. 
    
    Ako je izraz **!dropdownRef.current.contains(e.target)** istinit, to ukazuje da korisnik nije kliknuo unutar elementa koji je bio 
    referenciran. U tom slučaju, stanje varijable **isDropdownOpen** postavlja se na **false**, rezultirajući zatvaranjem padajućeg izbornika. 
    
    Ova logika omogućuje korisnicima da zatvore padajući izbornik jednostavnim klikom izvan njega, poboljšavajući ukupno korisničko iskustvo
    ```javascript
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
    ```
- ### [useEffect implementacija](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/Admin.js#L76)
    **useEffect** se koristi za postavljanje **event listenera** koji prati klikove na cijelom dokumentu. 
    Kada se komponenta montira, dodaje se **event listener** koji poziva funkciju **handleOutsideClick** kad god se klikne 
    izvan komponente. Kada se komponenta odmontira, event listener se uklanja.
    ```javascript
        useEffect(() => {
            document.addEventListener('click', handleOutsideClick);

            return () => {
                document.removeEventListener('click', handleOutsideClick);
            };
        }, []);
    ``` 
- ### [Renderiranje Admin.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/Admin.js#L109)

    Prvo se stvara `<main>` element unutar kojeg se ostali elementi renderiraju na dva načina: 
    - Ako korisnik nije prijavljen (stanje **isLoggedIn** je **false**): 
        Prikazuje se odjeljak (`<section>`) za prijavu administratora. 
        To uključuje naslov "Log in:", komponentu za prijavu (**AdminLogIn**), 
        prikazivanje eventualne poruke o pogrešci (**message**), te informacije o korisničkom imenu i lozinki.
    - Ako je korisnik prijavljen (stanje **isLoggedIn** je **true**): 
        Prikazuje se navigacijski izbornik (`<nav>`) s popisom veza (`<ul>`) koji omogućuju pristup različitim dijelovima
        administratorskog sučelja, poput proizvoda, narudžbi, statistike i opcije za odjavu. 
        Također, ovisno o stanju **isDropdownOpen**, prikazuje se i dodatni padajući izbornik s opcijama "Lista" i "Dodaj" za proizvode.
        U sklopu rutiranja (`<Routes>`), ovisno o trenutnoj ruti, prikazuju se odgovarajući dijelovi sučelja, poput liste proizvoda,
        narudžbi, statistike ili dodavanja novog proizvoda.
        Klikom na vezu "Log out", izaziva se funkcija **logOut** koja obavlja odjavu administratora.

    Korišteni su **React Router** komponente poput **Link**, **Route**, **Routes**, **Outlet** za upravljanje rutama i navigacijom unutar 
    administratorskog sučelja.

## 2. [AdminLogIn.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminLogIn.js)     [Top](#frontend){style="float: right;"}

- **AdminLogIn.js** 
    je komponenta koja prima **[handleLogin](#handlelogin)** kao parametar, te služi za prikaz i rukovanje obrascem za prijavu 
    administratora. Koristi se **useState** za praćenje stanja korisničkog imena i lozinke.
    ```javascript
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
    ```

- ### [handleSubmit](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminLogIn.js#L7)
    **handleSubmit** je funkcija koja se poziva kada korisnik pošalje obrazac. 
    Sprječava osvježavanje stranice (defaultno ponašanje forme) i
    poziva funkciju **[handleLogin(username, password)](#handlelogin)** s unesenim korisničkim imenom i lozinkom
    ```javascript
        const handleSubmit = (e) => {
            e.preventDefault();
            handleLogin(username, password);
        };
    ```

- ### [AdminLogIn.js Renderiranje](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminLogIn.js#L12)
    Renderira se HTML obrazac s `<input>` poljima za unos korisničkog imena i lozinke.
    ```javascript
        <form onSubmit={handleSubmit} className='adminLogIn'></form>
    ```
    Svako polje koristi value kako bi bilo kontrolirano prema stanju (username i password) definiranom pomoću **useState**.
    Koristi **onChange** događaj kako bi ažuriralo stanje svaki put kada korisnik unese ili promijeni vrijednost u polju.
    ```javascript
        <input type="text" placeholder="Username" value={username} 
            onChange={(e) => setUsername(e.target.value)} className='adminLogIn_username'/>
        <input type="password" placeholder="Password" value={password} 
            onChange={(e) => setPassword(e.target.value)} className='adminLogIn_password'/>
    ```
    `<button>` "Login" pokreće funkciju **handleSubmit** kada je pritisnuto.
    ```javascript
        <button type="submit" className='adminLogIn_submit'>Login</button>
    ```

## 3. [AdminProducts.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminProducts.js)     [Top](#frontend){style="float: right;"}

- **AdminProducts** 
    je funkcionalna komponenta odgovorna za upravljanje i prikazivanje liste proizvoda u administratorskom sučelju. 
    Komunicira s API-jem kako bi dohvatila, ažurirala i brisala informacije o proizvodima.

    Definiranje stanja verijabli:
    - **adminPro**: Sadrži popis proizvoda dohvaćenih iz API-ja.
    - **showImage**: Polje koje prati vidljivost slika za svaki redak.
    - **produtsChange**: Prati promjene u podacima o proizvodu.
    - **searchQuery**: Predstavlja upit korisnika za filtriranje proizvoda.
    - **message**: Sprema poruke koje se prikazuju korisniku.
    - **productDeleteInfo**: Sadrži informacije o proizvodu koji se želi izbrisati.

- ### [filteredProducts](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminProducts.js#L11)

    **filteredProducts** funkcija koristi metodu **filter** na polju **adminPro** kako bi filtrirala proizvode na 
    temelju unosa korisnika, odnosno **searchQuery**.
    **filter** funkcija stvara novo polje u koje stavalja sve **product**-te iz **adminPro**-a čiji **product.title** 
    sadrži tekst iz **searchQuery**-a.
    ```javascript
        const filteredProducts = adminPro.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    ```
- ### [handleSearchInputChange](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminProducts.js#L15)

    **handleSearchInputChange** je funkcija koja mjenja stanje **searchQuery**-a u vrijednost **event.target.value** iz 
    događaja koji joj je proslijeđen.
    ```javascript
        const handleSearchInputChange = (e) => {
            setSearchQuery(e.target.value);
        };
    ```

- ### [handleProductChange](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminProducts.js#L19)

    **handleProductChange** je funkcija koja se koristi za upravljanje promjenama unutar podataka o proizvodu.
    Zahtjeva tri parametra:
    - **id**: identifikacijski broji.
    - **key**: Ključ (naziv svojstva) podatka o proizvodu koji se mijenja.
    - **value**: nova vrijednost koja se dodaje odabranom svojstvu.
    ```javascript
        const handleProductChange = (id, key, value) => {}
    ```
    Prvo se provjerava postoji li već zapis za određeni proizvod u stanju **produtsChange**. Ako je prisutan, koristi se funkcija 
    **setProductsChange** za ažuriranje stanja **produtsChange**. U slučaju da postoji prethodno stanje za taj proizvod, koristi se
    širenje **(...prevState)** kako bi zadržale prethodne vrijednosti. Nakon toga, dodaje ili ažurira vrijednost pod ključem **id**,
    a pod ključem **key** postavlja novu vrijednost **value**.
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
    Ako ne postoji zapis za odabrani proizvod, stvara novi zapis koristeći **setProductsChange**. Opet se koristi širenje prethodnog
    stanja, a zatim dodaje novi zapis pod ključem **id** koji ima ključ **key** sa vrijednošću **value**.
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
- ### [handleClick](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminProducts.js#L38)

    **handleClick** je funkcija koja se koristi za upravljanje prikazom slike određenog proizvoda.

    Zahtjeva jedan parametar:
    - **index**: Indeks reda na koji je kliknuto.
    ```javascript
        const handleClick = (index) => {}
    ```
    Prvo, stvara se nova niz od **false** vrijednosti, gdje je duljina niza jednaka broju redaka u tablici (**adminPro.length**). 
    Zatim se taj niz postavlja kao inicijalno stanje za prikazivanje slika (**setShowImage(initialShowImage)**).
    ```javascript
        const initialShowImage = Array(adminPro.length).fill(false);
        setShowImage(initialShowImage);
    ```
    Nakon toga, stvara se kopija trenutnog stanja za prikazivanje slika (**const newShowImage = [...showImage]**). 
    Vrijednost za kliknuti redak (na indeksu index) toggle-uje  se, što znači da ako je trenutna vrijednost **true**, 
    postaje **false**, i obrnuto. Ova promjena se događa kako bi se slika tog reda prikazala ili sakrila. Na kraju, 
    novo stanje za prikazivanje slika postavlja se na ažuriranu vrijednost 
    (**setShowImage(newShowImage)**)
    ```javascript    
        const newShowImage = [...showImage]; 
        newShowImage[index] = !newShowImage[index]; 
        setShowImage(newShowImage);
    ```
    Ova funkcija omogućuje dinamičko prikazivanje ili sakrivanje slika klikom na određeni red u tablici, 
    koristeći stanje **showImage** koje prati trenutno stanje vidljivosti slika za svaki red.

- ### [handleProductsChangeSubmit](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminProducts.js#L46)

    **handleProductsChangeSubmit** je funkcija koja se poziva kada korisnik želi poslati promjene proizvoda prema serveru.

    Koristi funkciju **fetch** za slanje asinkronog **HTTP PUT** zahtjeva prema određenom **API** endpointu koji je definiran u
    environmentu. Postavlja potrebne opcije zahtjeva, uključujući metodu, autorizacijski token, i tip sadržaja na JSON.
    ```javascript
        fetch(process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(produtsChange),
        })
    ```
    Nakon što server obradi zahtjev, obradjuje se odgovor. Ako je odgovor uspješan (status kod 2xx), resetira se stanje
    **produtsChange** na prazan objekt pomoću **setProductsChange({})**. Ako je odgovor neuspješan, postavlja se poruka o grešci 
    (**setMessage("Error while updating data!")**) i izaziva se greška kako bi se prešlo na blok **catch**.
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
    Ako je odgovor bio uspješan, obrađuje se JSON podaci dobiveni iz odgovora. Ispisuje se odgovor na API u konzoli 
    (**console.log("API response:", data)**). Postavlja se poruka o uspješnom ažuriranju (**setMessage(data.message)**).
    ```javascript
        .then((data) => {
            console.log("API response:", data);
            setMessage(data.message);
        })
    ```
    Ako se dogodi bilo kakva greška tijekom izvršavanja zahtjeva (npr. mrežna greška, neuspješan odgovor servera), 
    hvata se greška u bloku **catch**. Ispisuje se detaljan opis greške u konzoli (**console.error("Error:", error)**). 
    Postavlja se poruka o grešci na vrijednost 
    greške (**setMessage(error)**).
    ```javascript
        .catch((error) => {
            console.error("Error:", error);
            setMessage(error);
        });
    ```
    Ukratko, ova funkcija obavlja asinkronu komunikaciju s serverpm kako bi poslala promjene proizvoda, a zatim obrađuje 
    odgovor i upravlja stanjem aplikacije prema rezultatima.

- ### [handleProductDelete](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminProducts.js#L73)

    **handleProductDelete** je funkcija koja se poziva kada korisnik želi izbrisati određeni proizvod.
    Koristi funkciju **fetch** za slanje asinkronog **HTTP DELETE** zahtjeva prema određenom API endpointu koji je definiran 
    u environmentu. Postavlja potrebne opcije zahtjeva, uključujući metodu, autorizacijski token, tip sadržaja na JSON, 
    i tijelo zahtjeva koje sadrži **ID** proizvoda koji se želi izbrisati.
    ```javascript
        fetch(process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id}),
        })
    ```
    Nakon što server obradi zahtjev, obrađuje se odgovor. Ako je odgovor uspješan (status kod 2xx), ažurira se stanje **adminPro** 
    tako da se izbriše proizvod s odgovarajućim **ID**-om iz niza proizvoda. Resetira stanje **productDeleteInfo** na praznu
    vrijednost. Postavlja se poruka o uspješnom brisanju proizvoda.
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
    Ako se dogodi bilo kakva greška tijekom izvršavanja zahtjeva (npr. mrežna greška, neuspješan odgovor servera), 
    hvata se greška u bloku **catch**. Ispisuje se detaljan opis greške u konzoli. Postavlja se poruka o grešci na vrijednost greške.
    ```javascript
        .catch((error) => {
            console.error("Error deleting product:", error.message);
            setMessage(error.message);
        });
    ```
    Ukratko, ova funkcija obavlja asinkronu komunikaciju s poslužiteljem kako bi izbrisala odabrani proizvod, a zatim obrađuje odgovor 
    i upravlja stanjem aplikacije prema rezultatima.

- ### [useEffect implementacija](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminProducts.js#L104)

    **useEffect** se koristi za izvršavanje asinkronog koda, posebno poziva prema serveru kako bi se dohvatili podaci o proizvodima.
    Unutar **useEffect** definira se **fetchData** funkcija koja sadrži logiku dohvaćanja podataka.
    ```javascript
        useEffect(() => {
            const fetchData = async () => {}
        });
    ```
    **fetchData** koristi **fetch** funkciju za slanje HTTP zahtjeva prema određenom API endpointu. U zaglavljima zahtjeva postavlja se 
    autorizacijski token kako bi se provjerila autentičnost korisnika. Ako je odgovor uspješan (status kod 2xx), dohvaćeni podaci 
    o proizvodima se pretvaraju u JSON format koristeći await res.json(). 
    Ažurira se stanje **adminPro** s dohvaćenim podacima o proizvodima 
    (**setAdminPro(productsData)**).
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
    Ako dođe do greške prilikom izvršavanja zahtjeva (npr. mrežna greška, neuspješan odgovor servera), hvata se greška u bloku **catch**.
    Ispisuje se detaljan opis greške u konzoli.
    ```javascript
        catch (error) {
            console.error("Error Fetching data:", error);
        }
    ```

- ### [AdminProducts.js Renderiranje](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminProducts.js#L126)

    **AdminProducts** renderira na način da: 

    - **Brisanje proizvoda**: 
        - Potvrda brisanja proizvoda: 
            - Ako postoji informacija o proizvodu za brisanje (**productDeleteInfo**), renderira se dijalog koji potvrđuje brisanje 
            određenog proizvoda. U dijalogu se prikazuje naziv proizvoda, a korisnik može odabrati "DA" za potvrdu brisanja ili "NE" za
            odustajanje. Brisanje proizvoda izvršava se putem funkcije **handleProductDelete**.

        - Prikaz poruke: 
            - Ako postoji poruka (**message**), renderira se dijalog s porukom i gumbom za zatvaranje. Poruka se postavlja i kontrolira
            stanjem komponente.

    - **Tablica**:
        - Zaglavlje tablice: 
            - Renderira se zaglavlje tablice s nazivima stupaca: "Redni broj", "Ime", "Vrsta mesa", "Cijena/kg", "Na stanju", "IMG" te
            prazan stupac za gumbe i akcije.

        - Tijelo tablice: 
            - Renderira se tijelo tablice koje mapira kroz filtrirane proizvode i prikazuje ih u redovima tablice. 
            Svaki red tablice sadrži informacije o proizvodu kao što su redni broj, ime, vrsta mesa, cijena po kilogramu, dostupna 
            količina, gumb za prikazivanje slike, opcija dodavanja slike, gumb za brisanje proizvoda i slično.

        - Podnožje tablice: 
            - Renderira se podnožje tablice s gumbom za potvrdu promjena. Gumb omogućuje slanje promjena prema poslužitelju putem 
            funkcije **handleProductsChangeSubmit**.

    Ukupno, AdminProducts renderira se s nizom funkcionalnosti i elemenata koji omogućuju administratoru učinkovito upravljanje 
    proizvodima putem jednostavnog korisničkog sučelja.

## 4. [AddProducts.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AddProducts.js)     [Top](#frontend){style="float: right;"}

- **AddProducts** je funkcionalna komponenta odgovorna za dodavanje novih proizvoda u sustav. 
    Ova komponenta pruža obrazac (formu) za unos 
    podataka o proizvodu, uključujući naziv, cijenu, količinu na stanju, vrstu mesa te sliku proizvoda.

    Definiranje stanje veriable:
        - **productInfo** : prati stanje podataka o novom proizvodu. Uključuje naziv, cijenu, količinu na stanju, vrstu mesa i 
        sliku proizvoda.
    ```javascript
            const [productInfo, setProductInfo] = useState({
                title: '',
                price: '',
                onStorage: '',
                meatType: '',
                image: null,
            });
    ```
- ### [handleAddSubmit](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AddProducts.js#L13)

    **handleAddSubmit** funkcija se koristi za proces dodavanja novog proizvoda na server putem HTTP POST zahtjeva.

    Obrada događaja podnošenja obrasca započinje sprječavanjem uobičajenog ponašanja obrasca pomoću **e.preventDefault()**, čime se 
    spriječava osvježavanje stranice. Nakon toga, funkcija definira **URL** na koji će se poslati **HTTP** zahtjev. 
    Ovaj **URL** je preuzet iz okoline (environment), pružajući fleksibilnost i omogućujući laku promjenu adrese poslužitelja.
    ```javascript
        const handleAddSubmit = async (e) => {
            e.preventDefault();
            try {
                const url = process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API;
    ```
    Sljedeći korak u procesu je stvaranje novog objekta **FormData** koji će se koristiti za prijenos podataka s obrasca u obliku 
    ključ-vrijednost. **FormData** omogućuje strukturiranje podataka na način prikladan za slanje prema serveru.
    ```javascript
                const formData = new FormData();
                formData.append('title', productInfo.title);
                formData.append('price', productInfo.price);
                formData.append('onStorage', productInfo.onStorage);
                formData.append('meatType', productInfo.meatType);
                formData.append('image', productInfo.image);
    ```
    Zatim slijedi slanje **HTTP POST** zahtjeva korištenjem funkcije **fetch**. Postavke zahtjeva uključuju određivanje 
    metode (**POST**), uključivanje informacija o autentikaciji (**credentials: 'include'**), postavljanje autorizacijskog tokena 
    u zaglavlje (**headers**), te definiranje tijela zahtjeva koje sadrži **FormData** objekt s podacima o proizvodu.
    ```javascript
                const req = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token.token}`,            
                    },
                    body: formData,
                });
    ```
    Nakon slanja zahtjeva, funkcija provjerava je li odgovor servera uspješan (status kod 2xx). Ako jest, ispisuje se poruka u konzoli 
    potvrđujući uspješno dodavanje proizvoda.
    ```javascript
                if (req.ok) {
                    console.log("Product Add")
                }
    ```
    U slučaju greške tijekom slanja zahtjeva, hvata se greška u bloku catch. Detaljan opis greške ispisuje se u konzoli. 
    ```javascript
            } catch (err) {
                console.error('Error giving product:', err)
            }
    ```
    Sve ove faze čine ključni dio procesa dodavanja novog proizvoda na serveru putem **HTTP POST** zahtjeva, osiguravajući da se
    postupak odvija glatko i pouzdano.

- ### [handleInputChange](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AddProducts.js#L40)

    **handleInputChange** je event handler koji se koristi za obradu promjena unosa u formi. 

    Prvo se dekonstruira objekta da izvuče **name** i **value** iz **event.target**. **event.target** se odnosi na element koji je
    pokrenuo događaj, u ovom slučaju input element forme. **name** je ime input elementa, a **value** je trenutna vrijednost unesena 
    u **input** element.
    ```javascript
        const { name, value } = event.target;
    ```
    Zatim se koristi funkciju **setProductInfo** da ažurira stanje **productInfo**. **...productInfo** koristi spread operator da 
    kopira sve trenutne vrijednosti **productInfo** u novi objekt. **[name]: value** dodaje ili ažurira vrijednost sa ključem koji 
    je jednak **name** sa novom vrijednošću **value**.
    ```javascript
        setProductInfo({ ...productInfo, [name]: value, });
    ```
    Ukupno, ova funkcija ažurira stanje **productInfo** svaki put kada korisnik mijenja vrijednost u input elementu forme, koristeći 
    ime input elementa kao ključ i unesenu vrijednost kao vrijednost.

- ### [handleFileChange](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AddProducts.js#L48)

    **handleFileChange** je event handler koji se koristi za obradu promjena unosa datoteke.

    Prvo provjerava postoji li datoteka u **event.target.files** i je li duljina veća od 0. Ako je, odabrana slika postavlja se na prvu 
    datoteku u **event.target.files**.
    ```javascript
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
    ```
    Zatim se koristi funkciju **setProductInfo** da ažurira stanje **productInfo**. **...productInfo** koristi spread operator da kopira 
    sve trenutne vrijednosti productInfo u novi objekt. **image: selectedImage** dodaje ili ažurira vrijednost sa ključem '**image**' sa 
    novom vrijednošću **selectedImage**.
    ```javascript
            setProductInfo({ ...productInfo, image: selectedImage, });
        }
    ```
    Ukupno, ova funkcija ažurira stanje productInfo svaki put kada korisnik mijenja odabranu datoteku u input elementu forme, 
    koristeći '**image**' kao ključ i odabranu datoteku kao vrijednost.

- ### [AddProducts.js Renderiranje](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AddProducts.js#L55)

    **AddProducts.js** se renderira na načina da se renderira forma(`<form>`) koja omogućuje korisniku unos informacija o novom 
    proizvodu. Forma uključuje polja(`<input>`) poput naziva proizvoda, cijene, količine na stanju, vrste mesa i mogućnost dodavanja 
    slike proizvoda. 

    Prilikom unosa podataka u formu, korisnički unos se prati putem stanja komponente. Funkcija **handleInputChange** ažurira 
    stanje komponente kako bi odražavalo unesene podatke.

    Korisnik može odabrati sliku proizvoda putem odgovarajućeg polja(`<input type='file'>`). Funkcija **handleFileChange** prati 
    odabrane datoteke i ažurira stanje komponente s odabranom slikom.

    Kada korisnik pritisne gumb "DODAJ"(`<<button type='submit'>`), pokreće se funkcija **handleAddSubmit**.

## 5. [AdminOrders.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminOrders.js)     [Top](#frontend){style="float: right;"}

- **AdminOrders** je komponenta koja prikazuje listu naruđbu i omogućava pregled istih

- Definiranje stanja verijabli:
    - **adminOrd**: Stanje adminOrd koristi se za pohranu podataka o narudžbama. 
    - **shouldRefetch**: Stanje shouldRefetch koristi se kao oznaka za ponovno dohvaćanje podataka s poslužitelja.
    - **message**: Stanje message koristi se za prikazivanje poruka korisnicima.
    - **visibleOrders**: Stanje visibleOrders koristi se za praćenje vidljivosti pojedinih narudžbi.

- ### [toggleVisibility](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminOrders.js#L10)

    Funkcija **toggleVisibility** omogućuje prebacivanje vidljivosti narudžbe. Ako je narudžba već vidljiva, uklanja ju iz stanja 
    visibleOrders. Inače, dodaje ju na kraj niza.
    ```javascript
        const toggleVisibility = (orderId) => {
            if (visibleOrders.includes(orderId)) {
            setVisibleOrders(visibleOrders.filter((id) => id !== orderId));
            } else {
            setVisibleOrders([...visibleOrders, orderId]);
            }
        };
    ```

- ### [useEffect implementacija](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminOrders.js#L18)

    **useEffect** koristi se za asinkrono dohvaćanje podataka s poslužitelja kada komponenta **mounta** ili kada se promijeni 
    **shouldRefetch** stanje. Zatim se definira funkcija fetchData koja koristi **fetch API** za dohvaćanje podataka o narudžbama s 
    definiranog **URL**-a. Autorizacija se vrši putem **tokena** koji se šalje u zaglavlju zahtjeva.
    Ako dohvaćanje bude uspješno (status kod 2xx), podaci se pretvaraju u **JSON format** i pohranjuju u stanje **adminOrd**. 
    U suprotnom, hvata se greška i ispisuje u konzoli.
    ```javascript
        const fetchData = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_ADMIN_GET_ORDERS, {
            method: 'GET', 
            headers: {
                Authorization: `Bearer ${token.token}`,
            }});
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

- ### [AdminOrders.js Renderiranje](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminOrders.js#L43)

    **AdminOrders.js** komponenta se renderira na sljedeći način:

    - **Naslov i Zaglavlje Tablice:**

        - `<h1 style={{ padding: "1rem" }}>Orders</h1>`: Prikazuje naslov "Orders" s određenim stilom.
        - `<thead>` element: Definira zaglavlje tablice s nazivima stupaca kao što su "Num", "Buyer", "Date" te prazan stupac.

    - **Tijelo Tablice (Tbody):**

        - `{adminOrd.slice().reverse().map((orderData, index) => (`: Mapira kroz niz narudžbi (**adminOrd**), reverzira ga kako bi 
        najnovije narudžbe bile na vrhu, te prikazuje informacije o svakoj narudžbi u retcima tablice.
        - `<tr>` element: Prikazuje redak za svaku narudžbu. Boja retka ovisi o statusu narudžbe. Ako je narudžba u tijeku, boja je 
        zelena. Ako je narudžba otkazana, boja je crvena. Klikom na redak, poziva se funkcija **toggleVisibility** kako bi se 
        promijenila vidljivost detalja narudžbe.
        - Detalji narudžbe: Ako je narudžba označena kao vidljiva (`visibleOrders.includes(orderData._id)`), prikazuju se dodatni 
        redak s komponentom **AdminOrder** koja prikazuje detalje narudžbe.

    - **Podnožje Tablice (Tfoot):**

        - `<tfoot>` element: Definira podnožje tablice s jednim retkom i praznim poljem.

    - **Poruka:**

        - `<div className={message ${message ? "visible" : "hidden"}}>`: Prikazuje div element s klasama "message", ovisno o 
        tome postoji li poruka (**message**). Ako postoji, koristi se klasa "**visible**", inače "**hidden**".
        - `<button className="messageButton" onClick={() => setMessage("")}>`: Gumb za zatvaranje poruke koji poziva funkciju za 
        postavljanje poruke na prazan string.
        - `<p>{message}</p>`: Prikazuje sadržaj poruke.

    - **AdminOrder Komponenta:**

        - <AdminOrder>: Ukoliko je detalj narudžbe vidljiv, poziva se **AdminOrder** komponenta s odgovarajućim props-ovima.
        ```javascript
            <AdminOrder 
                orderData={orderData} setMessage={setMessage}
                toggleVisibility={() => toggleVisibility(orderData._id)} 
                setShouldRefetch={setShouldRefetch} token={token}
            />
        ```

## 6. [AdminOrder.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminOrder.js)     [Top](#frontend){style="float: right;"}

- **AdminOrder.js** je komponenta koja prikazuje detalje o narudžbi, i omogućava odbijanje ili prihvaćanje iste.

    Zahtjeva pet svojstava(**props**):
    - **orderData**: sadržava informacije id narudžbi.
    - **toggleVisibility**: kontrolira prikaz narudžbe.
    - **setMessage**: postavlja stanje poruke.
    - **setShuldeRefetch**: postavlja stanje verijable za ponovno povlačenje narudžbi s servera.
    - **token**: sadržava AccessToken.

    Prvo se rekonstruira **orderData** u pojedinačne vrijednosti.
    ```javascript
        const { _id, buyer, date, num, products, status } = orderData;
    ```
    Zatim definiramo **orderStatus** stanje, i postavljamo ga u vrijednost **status**.
    ```javascript
        const [orderStatus, setOrderStatus] = useState(status);
    ```

- ### [handleConfirme](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminOrder.js#L14)
    **handleConfirme** je funkcija koja potvrđuje narudžbu.
    Definira se **response** unutar **try** block-a koji poziva **fetch** funckiju sa **POST** metodom, u **headers** se 
    postavlja **token** za provjeru autentikacije, a u **body** se postavlja **_id** kao identifikacijiski broji narudžbe.
    ```javascript
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id }),
    ```
    Zatim se provjerava `if (resonse.ok) {}`, ako je **if statment** pozitivan onda se izvršava sljedeće:
    - `setOrderStatus(true);`
        - postavlja se stanje **orderStatus** u **true**, te se s time potvrđuje da je narudžba potvrđena.
    - `toggleVisibility(_id);`
        - zatvara se prikaz otovorene naruđbe
    - `setMessage(Narudžba br:${num} je potvrđena!);`
        - prikazuje se poruka
    - `setShouldRefetch(true);`
        - postavlja se stanje **shuldeRefetch** u **true**, s čime se daje znak za ponovno povlačenje podataka.
    
    U suprotnom, se provjerava `else if (response.status === 400) {}`, ako je ovaj **if statment** pozitivan izvršava se sljedeće:
    - `const errorResponse = await response.json();`
        - definira se pogreška.
    - `setMessage(Greška: ${errorResponse.error});`
        - pogreša se prikazuje kao poruka.
    Ako je i **else if** negativan onda se izvršuje posljedni statment, odnosno **else {}**:
    - `setMessage("Došlo je do problema, molim pokušajte ponovno.");`
        - postavlja se poruka.        
    - `throw new Error("Network response was not ok.");`
        - definira se nova greška kako bi ju **catch** block uhvatio.
    Na kraju se izvršava **catch (error)** koji prikazuje **error** u konzoli.

- ### [Renderiranje AdminOrder.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/client/src/Admin/AdminOrder.js#L71)

    **AdminOrder.js** se renderira na način da prikazuje detalje narudžbe unutar div elementa s klasom "adminOrdDis". 

    Renderira se gumb za zatvaranje narudžbe, a klikom na njega poziva se funkcija toggleVisibility.

    U "adminOrdDis__head" div elementu, prikazuju se podaci o kupcu, datumu i broju narudžbe.
    - Ime kupca se prikazuje unutar `<p>{buyer.name}</p>`.
    - Datum narudžbe se prikazuje unutar `<p>{date}</p>`.
    - Broj narudžbe se prikazuje unutar `<p>{num}</p>`.

    U "adminOrdDis__products" div elementu, prikazuju se detalji o proizvodima u narudžbi.
    Naslov "Products" prikazuje se kao `<h2>`.
    Za svaki proizvod u narudžbi, stvara se div element s klasom "product".
    Opis proizvoda prikazuje se unutar `<p>{product.description}</p>`.
    Količina proizvoda prikazuje se unutar `<p>{product.quantity} kg</p>`.

    Ovisno o statusu narudžbe **(true, false ili null)**, prikazuju se odgovarajuće poruke.
    - Ako je narudžba potvrđena **(orderStatus === true)**, prikazuje se poruka 
    "Order Confirmed!" s pozadinskom zelenom bojom `rgba(51, 178, 51, 0.75)`.
    - Ako je narudžba odbijena **(orderStatus === false)**, prikazuje se poruka 
    "Order Rejected!" s pozadinskom crvenom bojom `rgba(227, 53, 53, 0.801)`.
    - Ako status nije definiran **(orderStatus === null)**, prikazuju se gumbi za potvrdu i odbijanje narudžbe unutar 
    "adminOrdDis__ButtonBottom" div elementa, a klikom na njih pozivaju se funkcije **handleConfirme** i **handleReject**.
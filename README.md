# Mesnica Web Trgovina

## [Frontend](#frontend-razvoj-s-reactom)  [Backend](#backend-razvoj-s-nodejs-i-express)

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

- **url/admin/products**
- **url/admin/order**
- **url/admin/orderReject**
- **url/admin/orderConfirme**

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

url/admin/orderReject ruta izvršava **orderConfirme** funkciju unutar [orderController.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/controllers/orderController.js)

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


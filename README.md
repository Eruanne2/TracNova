# TracNova
[TracNova](https://trac-nova.herokuapp.com/#/) is a habit tracker app that offers more than just a history of how well you've stuck to your goals - it gives you a quantifiable measurement of why you should stick to them.

We all know that what gets measured gets improved. Like any other habit tracker, TracNova provides a place to record measurements of various habits you wish to cultivate, whether hours slept, money earned from sales, or calories eaten. However, with TracNova you are able to investigate the correlation between any two habits. Simply choose the two variables you want to compare, and TracNova will run the appropriate statistical test to find the correlation coefficient between them and indicate the nature of their interaction. The more often you log, the more accurate it becomes.

Does drinking water really help you lose weight? Does waking up earlier really make you more productive? Find out for yourself.

![splash page](https://github.com/Eruanne2/TracNova/blob/main/assets/readme_img/splash.gif)

# Table of Contents
* [Technologies Used](#technologies-used)
  * [Stack](#stack)
  * [Notable Dependencies](#notable-dependencies)
* [Features](#features)
  * [User Auth](#user-auth)
  * [Records in Factors](#records-in-factors)
  * [Correlations and Significance](#correlations-and-significance)
  * [Graphs](#graphs)
* [Future Features](#future-features)
* [Lessons Learned](#lessons-learned)

# Technologies Used
## Stack
* MongoDB
* Express
* React
* Node.js
## Notable Dependencies
* Redux
* Statistics.js
* ReCharts
* mongoose-data-seed
* jwt-token
* axios

# Features
## User Auth
User is able to Create an account, Login and Logout. When creating an account, the back-end express router first check for existing email to avoid duplicates. The password input is then combined with a salt, hashed using bcrypt, and saved into the database. 
```javascript
User.findOne({email: req.body.email})
.then(user => {
  if (user) return res.status(400).json({email: "Email already used."})
  else {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => res.send(user)).catch(err => res.send(err));
      })
    })
  }
})
```
When logging in, the password input is checked for matches in the database, then a json web token is assigned to the user that expires in one hour or when the user logs out.
```javascript
bcrypt.compare(password, user.password)
.then(isMatch => {
  if (isMatch) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    }
    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: 3600 },
      (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      }
    )
  }
  else return res.status(400).json({password: "Incorrect password"});
})
```

## Records in Factors
The variable objects ("factors") contain a `dailylogs` property which stores an object containing the dates as keys and measurements as values. A daily entry dropdown menu is located on the top of every page for convenience of the user and to remind users to log today's entry as they are using the app.

To edit or delete multiple records, users can go to the Factors page for a detailed view. In order to limit the number of backend API requests, the request is not sent until the user clicks "Save Factor Data". In this way, we avoid making a new request for every single record that is changed.

![daily entry form](https://github.com/Eruanne2/TracNova/blob/main/assets/readme_img/entry_form2.gif)

## Correlations and Significance

![correlation coefficient](https://github.com/Eruanne2/TracNova/blob/main/assets/readme_img/correlation_coef2.png)

There are three different methods used to calculate the correlation coefficient depending on the types of data. Factors measured in the form of yes/no are recorded as binary data, and records measured through a rating (1-5) or any custom unit are recorded as metric data.  

```javascript
  if (hasBinary && !hasOther){
    const valSets = data.map(pair => Object.values(pair));
    const count = { '0,0': 0, '0,1': 0, '1,0': 0, '1,1': 0 };

    valSets.forEach(set => {
      let key = set.toString();
      count[key] += 1 
    });
    
    const table = Object.values(count);

    return phi(table);
  }

  if (hasBinary && hasOther){
    // point-biserial
    return pointBiserial(data, varTypes);
  }

  if (!hasBinary && hasOther){
    // spearman
    const stats = new Statistics(data, varTypes);
    const spearman = stats.spearmansRho(...Object.keys(stats.columns));

    return spearman.rho;
  }
```

There are three possible combinations (binary-binary, binary-metric, or metric-metric) of datasets to be compared. 
* If both datasets are binary, the [phi coefficient](http://www.pmean.com/definitions/phi.htm) is used. 
* If one dataset is binary and the other is metric, the [point-biserial coefficient](https://ncss-wpengine.netdna-ssl.com/wp-content/themes/ncss/pdf/Procedures/NCSS/Point-Biserial_and_Biserial_Correlations.pdf) is used. 
* If both datasets are metric, [Spearman's Rho](https://statistics.laerd.com/statistical-guides/spearmans-rank-order-correlation-statistical-guide.php) is used. 

In every case, the resulting coefficient will be contained in the interval \[-1,1\], where 1 represents absolute positive correlation; -1 represents absolute negative correlation; and 0 represents no correlation.

The calculations for Spearman's Rho were imported through `Statistics.js`. Calculations for the other two methods were coded out by the team.

## Graphs

![drag to chart](https://github.com/Eruanne2/TracNova/blob/main/assets/readme_img/drag2chart.gif)

The dashboard graph utilizes React Hooks to manage a `selectedVar` and a `draggedVar`. There is always a `selectedVar`, which is displayed alone on the graph by default. However, when the `draggedVar` is given a value, the graph is rerendered to show both values and to include a scatterplot of the values. 

```javascript
  <section className='droppable-graph-box'
            onDragOver={e => e.preventDefault()}
            onDrop={handleReceiveDrop}>
    <ul className='tab-headers'>
    <h2 onClick={e => _setWhichTab(1)} className={_whichTab === 1 ? 'selected-tab' : ''}>Factor over Time</h2>
    {_draggedVar && 
      <h2 onClick={e => _setWhichTab(2)} className={_whichTab === 2 ? 'selected-tab' : ''}>Scatterplot</h2>
    }
    </ul>
    {_whichTab === 1 && 
      <div className='tab-one'>
        <div className='graph-container'>
          <Chart variables={[_selectedVar, _draggedVar]}/>
        </div>
      </div>
    }
    {_whichTab === 2 && 
      <div className='tab-two'>
        <div className='graph-container'>
          <ScatteredChart variables={[_selectedVar, _draggedVar]}/>
        </div>
      </div>
    }
  </section>
```

# Future Features
* Mobile-friendly - make the website responsive for small screen sizes and for mobile.
* Multi-Variable Correlations - allow the option to drag multiple variables onto the graph to calculate three-way correlations. 

# Lessons Learned
## Database Design
* To update a nested object value of the field in a document, simply making changes to the nested object by mutating it will not persist in the database when the document is saved. The nested object value needs to be duplicated, updated, then reassigned to the field before saving the document.
## Work Delegation
* Learned to allocate time for group meeting to avoid design and styling conflict among parallel branches.
* Learned to communicated more explicitly about how certain security measures will be implemented and how this will affect other parts of the codebase. 

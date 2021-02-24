# Cocoa

## The epic

Setup development process and design a service, that given a string with line breaks ("\n") and formatting parameters, returns a string formatted with basic markdown syntax.

Example input:

```
If you are looking to have an impact on the world, then read carefully because at Cocoa, we are moving mountains to transition the world into sustainable food systems.\nThe food industry is an industry with essential problems, especially in food-supply-chain. We are now leveraging technology to bring change and start the necessary transformation the industry is craving for.\nWe are building the digital platform on which the global food trade will operate. Our company has the potential to reduce food prices, decrease food waste by 30% and reshape one of the oldest and largest industries on the planet.
```

The service should be able to:

- Limit text to a specified line width.
- Align text to left, right and center within the specified line width.
- Set single or double line spacing.
- Given a list of words, turn them bold using markdown syntax. (ie. all **Cocoa** words in text should be made bold)
- Given a list of words, turn them italic using markdown syntax. (ie. all _food_ words in text should be made italic)
- Given a list of words and their substitutions, replace all occurrences of the specified words with their substitutions. (ie. replace every Cocoa with COCOA and so on)
- Given a list of words, add a random Chuck Norris food fact after the paragraph where such words are found. (possible source https://api.chucknorris.io/)

Further requirements would be added in the next sprint.

### A test case

Given the parameters:

```
- Line width: 80
- Text alignment: right
- Spacing: single
- Bold strings: "Cocoa", "Chuck", "Norris"
- Italic strings: "food"
- Replace strings: ("Cocoa", "COCOA"), ("sustainable", "SUSTAINABLE")
- Chuck Norris food fact strings: "industry", "change"
```

And the input text:

```
If you are looking to have an impact on the world, then read carefully because at Cocoa, we are moving mountains to transition the world into sustainable food systems.\nThe food industry is an industry with essential problems, especially in food-supply-chain. We are now leveraging technology to bring change and start the necessary transformation the industry is craving for.\nWe are building the digital platform on which the global food trade will operate. Our company has the potential to reduce food prices, decrease food waste by 30% and reshape one of the oldest and largest industries on the planet.
```

One possible output could be:

```
 If you are looking to have an impact on the world, then read carefully because\n at **Cocoa**, we are moving mountains to transition the world into SUSTAINABLE\n                                                                _food_ systems.\n      The _food_ industry is an industry with essential problems, especially in\n  food-supply-chain. We are now leveraging technology to bring change and start\n                      the necessary transformation the industry is craving for.\n When **Chuck** **Norris** is in the mood for seafood... he enjoys fresh caught\n                                                                    Kracken!!!!\n     We are building the digital platform on which the global _food_ trade will\noperate. Our company has the potential to reduce _food_ prices, decrease _food_\nwaste by 30% and reshape one of the oldest and largest industries on the planet.
```

Or what's the same but replacing the "\n" with actual line breaks for better readability in this Readme:

```
 If you are looking to have an impact on the world, then read carefully because
 at **Cocoa**, we are moving mountains to transition the world into SUSTAINABLE
                                                                _food_ systems.
      The _food_ industry is an industry with essential problems, especially in
  food-supply-chain. We are now leveraging technology to bring change and start
                      the necessary transformation the industry is craving for.
 When **Chuck** **Norris** is in the mood for seafood... he enjoys fresh caught
                                                                    Kracken!!!!
     We are building the digital platform on which the global _food_ trade will
operate. Our company has the potential to reduce _food_ prices, decrease _food_
waste by 30% and reshape one of the oldest and largest industries on the planet.
```

## Updates

## Intro

Dear all,

Please find progress / to-do list bellow.

### How to run

Basically once checked out just run `make`.

It will start up dependencies (a service instance) in docker container, build it, wait for it to run,
and will execute http request. Then it will tear it down.

If you wanna run a service then after standard `npm install` please run `npm run dev`.
Or you could run `npm run build` and then `npm start`.

Also you can run service in docker container in "production" mode by doing `docker-compose up --build test`.

I played around with DigitalOceal App platform and deployed app here - https://cocoa-ffjdz.ondigitalocean.app/

To check health of the app run `$ curl -s https://cocoa-ffjdz.ondigitalocean.app/api/v1/health | jq`

Or run something like
```shell
curl -s \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer 566e799e-42a5-476b-ab34-f7541e309fae' \
  -X POST 'https://cocoa-ffjdz.ondigitalocean.app/api/v1/format' -d '{"text":"Your bones dont break, mine do. Thats clear.\nYour cells react to bacteria and viruses differently than mine. You dont get sick, I do. Thats also clear.\nBut for some reason, you and I react the exact same way to water.","config":{"bold":["sick"],"italic":["water"],"replace":{"water":"vodka"},"food_facts":["water"]}}' \
  | jq
```

Btw you could use any auth value instead of `566e799e-42a5-476b-ab34-f7541e309fae`.

P.S. continuous deployment to DO is disabled since I had to revoke the token because I have no access to repo settings to put it in secrets.

### Status

- [x] General folder structure
- [x] Linters
- [x] Generic test structure
- [x] Build pipeline (CI)
    - [x] Pipeline executor
    - [x] Linters
    - [?] Dependabot / Renovate / or at least `npm audit` (✅)
    - [x] Tests
    - [ ] Husky / Commitizen
    - [ ] Conventional CHANGELOG generator
        - [ ] Conventional commits required
    - [x] Container smoke test
    - [x] NVM (sorta)
- [ ] Processing modules
    - [x] Bold
    - [x] Italic
    - [x] Replace
    - [x] Text enrichment
        - [x] API integration
        - [x] Caching layer
        - [x] Text injection
    - [ ] Text width formatter
    - [ ] Text align formatter
    - [x] New line spacing
- [x] Put processing together
    - [x] Tests
- [x] HTTP handler
    - [x] CORS
    - [x] Auth
    - [ ] Streaming
      - [ ] String tokenizer
    - [ ] Config
    - [?] Logger / or at least build in `pino` (✅)
- [x] Makefile
- [x] Docker & dependencies
- [x] Deployment pipeline (CD)
    - [ ] GH pages for test coverage
    - [x] DO App platform / Heroku / AWS Lambdas / Twilio Functions or similar
- [ ] BB / GH mirror

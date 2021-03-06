# Poetic Play
![screen shot 2017-08-05 at 12 03 36 pm](https://user-images.githubusercontent.com/13789291/29132271-52619aa6-7cf5-11e7-8e61-c9515632ddc4.png)


### Live: [Poetic Play](https://poeticplay.herokuapp.com/)

## Summary

Poetic play was created to inspire the world to write more poems. Do you need an inspiring place on the internet to create and store your poems?  Would you like a safe place to learn and share your poems with others? Are you a teacher looking for a way to motivate your students to learn about poetry?  Writing poems is for everyone, and Poetic Play is the place to learn, share, and grow.

### Technologies used:

#### Front-End
HTML5 | CSS3 | JavaScript |  Materialize

#### Back-End
PostgreSQL | Postico | Node.js | Express | Heroku

#### Design
Illustrator | Photoshop

### MVP

Users will be able to:
* create a poem, save, and print
* look up synonyms and rhyming words with the Wordnik API
* read a tutorial on differnt types of poems
* word of the day

### Stretch goals

* allow the user to choose the type of poem they want to create
* poem idea generater
* users will create an account by loggin in with Google or Facebook
* poetry links, lessons, and examples
* user can submit a poem to the public database
* users can comment and rate poems
* word of the day with buttons to see the definition or example

### Tasks

- [x] Initial Layout in Node.js
- [x] Setup Postgres Database
- [x] Create Logo and images with Illustrator and Photoshop
- [x] Create Poem, Edit, Delete, Print
- [x] Add New Lines
- [x] Deploy with Heroku
- [ ] Clickable definition and example of word of the day
- [ ] Examples of poems and tutorials
- [ ] Video Lessons
- [x] Login Page when user isn't logged in
- [ ] Create a submit page to submit poems
- [ ] Update Postgres to accept submitted poems

### Challenges

* Creating a login system with Firebase
* Allowing user to log in with Google
* Getting the frontend to hangout with and be nice to the backend (so much fun!)
* Adding new lines to existing poems and having the new lines update when saved in Postgres
* Creating a mobile menu with Materialize and mobile responsiveness with images

![screen shot 2017-08-09 at 11 52 52 am](https://user-images.githubusercontent.com/13789291/29133525-5994655c-7cf9-11e7-9e65-d153145e21b7.png)

* Creating a session to save the UID
* Using the API Wordnik (orginall was using the BIG HUGE Thesaurus API, but switched because Wordnik had more to offer)

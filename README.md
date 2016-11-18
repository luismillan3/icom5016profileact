# Visual Onix

ProfileAct is a web application software that aims, to benefit students and research groups with their exposure to companies and graduate schools, by providing a simple way of promoting. themselves via an online portfolio. The software will let users upload a profile with their professional information, with the intention of being accessible by recruiters during the job fair week. It  will improve the communication between students and potential employers, and facilitate the process of recruitment in campus. It will be open to students from all majors, allowing for a larger group of students to be encouraged to attend the job fair and take advantage of the networking opportunities. Also, it will allow research groups to gain more opportunities for sponsorship from the industry and academia.


## Features
A. Students
  1. Will have their portfolio online to display their projects, resume, information, and picture
  2. Can access information about events and mark them to be reminder
A.	Recruiters (Companies and Graduate Schools)
  1.	Will have the option to select and save the information of the students
  2.	Can nominate research groups in the universities for sponsorship
  3.  Recruiters will also have the opportunity to promote their on-campus events

## Implementations ( Any change will be written down with it's date and author )

### Home & Menu

#### System
1. The menu is divided into 3 main segments: Shorts, Itinerary, and Voting
2. The side menu (hamburger menu) has been substituted with tabs to provide easier access to the main functionality of the app -Fernando Rodriguez      September 1, 2016

#### View
1. The menu is divided in three main buttons, and then hidden inside a hamburger menu (this will change to a tab menu to increase user interactivity) 


### Voting

#### System
1. The user logs in with his/her email to have a unique id
2. The user can access the movie voting list which is controlled from an administrator web page. This gives us total control of when a movie is displayed and how long will it be displayed
3. The application shows the movies open for voting
4. The rating is controlled by connecting the star images to the value of the vote and setting the value to it's string format in uppercase. Ex. 5 = "FIVE"
5. When the user votes, his unique ID is saved with the vote so that there are no duplicate votes

#### View
1. The list of movies open for voting is displayed
2. Users touch the movie to vote for it
3. They select a rating from 1 through 5, 1 being the default. The stars are connected to the value of the vote (needs better implementation)
4. After selecting, they press on the "submit" button and the vote is sent to the database


### Login

#### System
- The login is only asked for when the user is ready to vote and give us permission to store his/her email.
- The user is provided an option to reject usign the email to vote and go back to paper. This gives the user a choice instead of forcing them to use the application
- Core Data is implemeted to save the user's email locally

#### View
- An alertView is displayed giving the user the option of using his/her email to vote or call an usher to use a paper


### Itinerary

#### System
- The itineraty is implemented by displaying a WKWebView from the Enfoque web page
- An observer is implemented to display the loading bar until the page loads completely

#### View
- The itinerary on the Enfoque Web Page is displayed
- This will change to a custom itinerary


### Shorts

#### System
- 

#### View
- Displayed in an unordered list, not taking into consideration the id of each.


## Installation


You can download the application from the [iOS App Store](https://itunes.apple.com/us/app/enfoque-film-festival/id1085886415?mt=8) and [Android Google Play Store](https://play.google.com/store/apps/details?id=upr.ip.luismillan.enfoque&hl=en)

## Contribute



## Comments (Contributors post any comments with your name and the date in this section)
- Colors have been added as constants across the app to match those used on the website of the Enfoque Film festival. This will further add consistency across all platforms of the service. -Fernando Rodriguez  September 1, 2016




## Team

[![Fernando Arocho](http://placehold.it/150x150)](https://sindresorhus.com) | [![Fernando Rodriguez](http://placehold.it/150x150)](https://github.com/SamVerschueren)
---|---|---
[Fernando Arocho](https://sindresorhus.com) | [Fernando Rodriguez](https://github.com/SamVerschueren)


## License


The project is licensed by...

ex
Now that the basic functionality is complete and users can search and save songs, have tabs ready to go along with a powerful study screen to learn all scales, modes, triad positions and 7th chords, we can get to work on extending and improving the existing features to provide a professional feeling UX

## Home page - Recently Opened
Currently when opening the home page we have a search bar, get random track button and the search button. Let's fill up the home page.
- The search button can be removed completely as the searching happens automatically after the debounce period, can be replaced with a random scale #DONE 
- Add a prop to the Study screen that will preselect a scale #DONE 
- Make the scale selected be randomly selected #DONE 
- Open a new random scale on each button click #DONE 
#### Time to get back to the backend for an update. I will need to either add a new table, separate from the existing track table or attach a new table with userId and view count and a time stamp for when the track was opened, so that I can sort by the timestamp for recently opened
- Update the api endpoint to accept a used id and make a db call if one has been passed #DONE 
- Track whenever a user opens the single track page and keep statistics of how many times a track has been opened #DONE 

### Recently Opened
Add a couple of recently opened tracks so that users can keep playing from where they left off
- Make an endpoint where we can fetch the last 8 tracks opened by a user #DONE 
- Fetch them sorted by the timestamp, and limit the amount to 8 #DONE 
- In the home page, make a request and display a horizontal `FlatList` of these tracks #DONE 
### Favorites
- Show a `flatlist` of most opened tracks #DONE 
- Added type to reuse the same endpoint for fetching the history #DONE 
- Used raw sql queries to return the correct data #DONE 
### Recommendations
Use the current tracks in the library as the seed for recommendations in a horizontal `FlatList` of tracks. Better yet we can use a mix of the latest and most popular tracks.
- Create a component where the `flatlist` will be displayed #DONE 
- If the user uses **Safe** mode, we will put the 5 most opened tracks as the 5 track seeds #DONE 
- If the user uses **New** mode, the we will use the last 5 opened tracks #DONE 
- Scale/mode/triad/seventh of the day - Pick one at random and when clicking on it, it should open the study page with the fretboard open. #DONE 
##### Keep working on it so that all types are displayed correctly as we just expanded the scale data type, so all types need to tested
- Learn more link that will open the study page #DONE 
- On the theory of the day widget, there should be a couple of examples such as position one of the scales, notes/interval columns, name of the theory topic
- notes/intervals added #DONE 
- name and description #DONE 
- Format the name so that it is not in camelCase
- Manually test to see if the correct type will be preselected with all 4 theory types

#### Scale description
Each scale object already has a short description, but we have to find it as we are only using an array of string/mode names
- Let's add a short description for each scale
## Incorrect keys
- If a user notices that the key is not correct they can report it
- Admin can then edit the key and the correct key will be displayed instead of the one fetched from spotify
## Sound
Record each note so that users can click on each fret to play the note and see these scales sound like.
- Record each note for the first 16 frets #DONE 
- Create a sound context to manage the playing of files globally

### Create a separate wav file for each note
- High E string #DONE 
- B #DONE 
- G #DONE 
- D #DONE 
- A #DONE 
- Low E #DONE 

### Make clicking the frets play the notes
- Clicking on a fret will play the note #DONE 
- Double clicks should stop the previous clip and start again #DONE 
- Test and see if double click should stop the first clip or play it twice, try to make it feel as if you are playing a real guitar #DONE 
- Only one note can be active per string

#### Playable Note/Intervals columns
When displaying the note and interval columns for the selected scale, clicking on each column should play the appropriate note


## Circle of Fifths
- Add an option on the study page to display the circle of fifths
- When the user selects a key, the wheel should rotate
- Add advice on how to use it #Research

## The Lick
- On the study page, add the lick in each key as a sound sample
## Play mode
When we click play, we start the play along experience
- Use the bars and add some sort of indicator to show the progress
- Add a tick on each beat, play a sound if the users wants to function as a metronome
- We can loop over all of the beats
- Sections can be used to change the track info displayed
- Each section will display  the tempo, key , mode, time-signature
- For segments, try to use the pitch and timbre, but learn first what they represent
- For tatums, as they are less than a beat, we can have some sort of visual indicator but no sound or progress on the bar
- Scale schematics and chords will display in the middle of the image while track is playing
- Let's try to play it using a the user's own spotify account
- The image, name and artist will shift to the bottom
- Allow user to mute the track and only use the metronome, or just hear the track to play along


## Redesign the library/deleted split
- Library should be for songs I am learning to play
- Deleted should be for songs I have already learned or stopped learning
- Maybe add a tag and have many sections so that users can filter them more effectively
- Perhaps limit the number of tracks in the library to encourage focus on a couple of songs

## Drag and drop
- Allow users to reorder the tracks in the library/Bin
## Filters and search
- When in the Lib/Bin screen, users can apply filters or search tracks in the library
- The search bar can be somewhere on top in the header, with the title on the left edge
- This will be local until I implement an infinite query, after which it will make a db call

## Shazam-like integration
- Activate the mic to detect a song
- Afterwards search for that song and open the track details page
Possible APIs: [Audd](https://audd.io/) or [AcrCloud](https://www.acrcloud.com/) We need to use the recorded audio from the mic to make a call to an api/service to detect the song

## Supabase emails Design
Style the emails that supabase sends for email confirmation/reset password and everything else that we will use
###### It seems that Css is not being applied in the email being sent
###### After using the Figma plugin Marka, it generated a template that was rendered as intended on gmail. I have added a template for the forgot password, email but it needs a lot of work.
#### [Figma Email Templates](https://www.figma.com/file/aBU8v75k4laGQ5Qg7MaDod/Mail-design-system-for-Marka-Plugin-(Community)-(Copy)?type=design&node-id=0-1&mode=design&t=Oj8jOeNboUIQeaaV-0)
- Working email styles #DONE 
- Personalize the forgot password email using Figma to style the email
- Use a similar looking template for sign up and magic link emails
## Ui Motivation
- Have a look at the Spotify and ChatGPT apps for possible improvements to my UI

## Rate Limiting
- Currently users can spam the refresh button, limit it so that this is not possible

## Zustand
- If react query is not enough, use zustand to manage global state

## Chord Progressions
- Chord Progressions - This one I'm not too sure about. I could display some common chord progressions starting from the key of the song as the I chord, but I do not know if I can extract the chord progression of the song itself. Maybe by analyzing the sections/bars.

## Multiple Scale Selection
Allow users to select 2 or more scales at once, displaying multiple fretboards. I must pay attention to both fretboards being fully visible, although they will have to become smaller.


## Highlight possible voicings
- When rendering the fretboard for 7th chords or triads for example, I should do a simple check for possible shapes that can be played. These can be notes that are on adjacent frets, no more than 3 for example with triads. I will have to work on the implementation until it will helpful 


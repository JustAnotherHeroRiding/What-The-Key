## Launch 
It is time to launch on the app store. Test the auth experience and clean up any uncomplete features if any exist and try to get the get app launched. This will also require some screenshots and a description
[Guide](https://docs.expo.dev/submit/android/) 
A one time fee of 25 USD is required to create a google play dev account.
A yearly fee of 99 USD is required for the Apple app store

#### Testing sign up experience
Previously I noticed that the redirect page to github was buggy. Test some common scenarios and perhaps remove github from the providers.
- When signing up with email, show a toast that the user needs to verify their email before being able to sign in
- Leave only Spotify as the provider
- Use flex wrap for note-interval columns #DONE 


## Incorrect keys
If a user notices that the key is not correct they can report it
- Report incorrect key button in the detailed track component
- This will send a post request that the user can then browse
- We will need a new table, which will have the trackId, description, userId that submitted it and the correct key
- Admin can then edit the key and the correct key will be displayed instead of the one fetched from spotify
- User can either locally set his key or browse for user suggested keys that have been submitted
- each submission can have a description as well

## Circle of Fifths
- Add an option on the study page to display the circle of fifths
- When the user selects a key, show possible chord progressions and relationships between the keys
- Try creating lines between the keys to explain diatonic keys, tritones etc
- Add advice on how to use it #Research

## Scale builder
On the study page, allow users to build and save custom scales where they can select the intervals and name the scales and the fretboard will be populated with the intervals in the selected key

## The Lick
- On the study page, add the lick in each key as a sound sample
- Reuse the already included files and play them at an interval
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
- Remove the one color/border cards and use similar cards such as spotify/windows with blurred rounded background and no border

## Rate Limiting
- Currently users can spam the refresh button, limit it so that this is not possible

## Highlight possible voicings
- When rendering the fretboard for 7th chords or triads for example, I should do a simple check for possible shapes that can be played. These can be notes that are on adjacent frets, no more than 3 for example with triads. I will have to work on the implementation until it will helpful 
- Only include 3 adjacent strings and +2 frets at most from the middle


# To be developed in v2

### Infinite TODOs
When removing a track from the library, it is removed from the list. But even though the cache is invalidated for the recycle bin, the newly deleted track does not appear there. Same for restoring a track to the library. It likely has something to do with the cursor as it is a date and the newly added/restored track has a newer timestamp than the original `date.now` call. I will leave the library pages with a normal query as it should not be a problem unless a user adds 100s of tracks

## Drag and drop
- Allow users to reorder the tracks in the library/Bin
- This will require a db call to rearrange the order in the database
##### Currently we are sorting by timestamp, let's see how we can manipulate this with the drag and drop

## Multiple Scale Selection
Allow users to select 2 or more scales at once, displaying multiple fretboards. I must pay attention to both fretboards being fully visible, although they will have to become smaller.
##### If the keys themselves are almost never accurate, how can we trust the bars and smaller subsections? Let's leave this for a possible update and ship it without this feature
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

## Chord Progressions
- Chord Progressions - This one I'm not too sure about. I could display some common chord progressions starting from the key of the song as the I chord, but I do not know if I can extract the chord progression of the song itself. Maybe by analyzing the sections/bars.
## Shazam-like integration
- Activate the mic to detect a song
- Afterwards search for that song and open the track details page
Possible APIs: [Audd](https://audd.io/) or [AcrCloud](https://www.acrcloud.com/) We need to use the recorded audio from the mic to make a call to an api/service to detect the song




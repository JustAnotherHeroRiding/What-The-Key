# [Api Docs](https://what-the-key.vercel.app/docs)
# [Icons](https://icons.expo.fyi/Index)
# REQUIRED
Put this in a `local.properties` file in the android file whenever building local dev builds
`sdk.dir=C:\\Users\\Admin\\AppData\\Local\\Android\\Sdk`



# Logo Prompt
1. Design a sleek, modern logo that integrates an open book with musical motifs, which should be minimal and positioned on both pages of the open book. The logo should use my predefined color scheme of ``` blackCustom: '#000000', beigeCustom: '#f4dfc8', cream: '#f4eae0', creamLight: '#faf6f0', beigeDarker: '#e0dcd6', ```, using the complementary colors of beige and cream together with black and white, set against a pure white background suitable for a PNG format. The background should take up about 10% of the screen size while the remaining 90% should be the logo itself

2. "Create a bold, emblem-style logo that merges the letter 'B' with the full body of a wolf in mid-stride. The 'B' should be stylized to form part of the wolf's body or movement, with a dynamic and fluid design. Use a minimalist color palette with the logo on a white background to facilitate clean PNG extraction."


## Multi platform App

Instead of using Kotlin to create a native android app, let's use React native to create a multi platform app.
We need to implement the same 4 pages with full feature parity

## Navigation
- Navigate between the pages, using the same logos and look from the website #DONE 

## Home page
- Get random track #DONE 
- Debounce the input and only make a request after 300 ms have passed of no changes to the query #DONE 
##### [Custom debounce](https://sugandsingh5566.medium.com/mastering-throttle-and-debounce-functions-in-react-native-with-javascript-a03965240829) or we will use lodash. For now i am thinking using lodash
- Search spotify tracks #DONE 
- Style the search results #DONE 
- Add the close single result button inside of the component itself #DONE 
- Add tracks to library from the search results #DONE 
- Search results will be styled similar to spotify, small rows with small images of containers #DONE  
- Add track option from the random track #DONE 
- Responsive context menu when adding track #DONE 
- When adding a track, we should check that it is both not in the library or the recycle bin #Maybe 
#### Currently if i try to add a track that is is in the trash to the library, it will be moved which is actually not bad

## Services
To reduce code repetition, let's store all of the api calls into a single service 
- Create a track service #DONE 
- Move the add to library function to the service #DONE 
- Inject the service in all components where we do track related calls(Track, SearchResultTrack, RandomTrack) #DONE 
- Create a service for the spotify endpoint requests #DONE 
- Create two queries for searching tracks and getting a random track #DONE 
- Implement the functions from the service in the home page #DONE 
  - Add and get tab functions #DONE 

## React query
Implement react query to simplify all the data management
- The add track mutation is throwing a type error despite the fetch call being correctly type #DONE 
- Get tracks query #DONE 
- Permanently delete track mutation #DONE 

## Toasts
###### Bug alert
- Sometimes toasts are not showing up when adding tracks, even thought they should always be triggered from the mutation
Let's push the toast a bit higher as it is blocking the menu #DONE 

##### Image Distortion
- Currently the left and right sides of the image are being distorted in the result card due to the image being stretched. Make sure that the image does not lose quality and is preserved #DONE 
#### For now I set the width and height to be the same to keep the aspect ratio, object-contain was distorting the edges

## Track component
- Create a separate track component that will be used in the library and bin #DONE 
- equip it with all options like delete/restore, permanent delete, show/add tabs and open the spotify link
- Manage context menu boolean in each component separately #DONE 
- Adding and getting the tabs #DONE 
- Displaying tabs if they have been added #DONE 

## Library
- See all tracks in the user's library #DONE 
- Flatlist to render the tracks #DONE 
- Pull to refresh to make another request #DONE 
- Delete the tracks to send them to the recycle bin #DONE 
- Infinite scroll for tracks
- Display tabs in the context menu #DONE 
## Deleted 
- See all tracks added to the recycle bin #DONE 
- Restore tracks to library or delete them permanently #DONE 
- Display tabs in the context menu #DONE 

## Animations
- When the Random track is closed or opened there should be a smooth animation, similar to the balloon effect in the webapp #DONE 
	- See where we can implement animation in other places. I think adding and removing tracks are obvious candidates but they should not mess with the cache refreshes from react query

## Adding tracks and cache
- Adding a track works but there was a bug where no toast was displayed yet the track was added #Bug
- Also the context menu should also close #DONE 
- The cache needs to be invalidated, it seems to be autocached #DONE #ReactQuery

## Auth
- Log in and manage the library of tracks using the same database as the website #DONE 
- Use the supabase tutorial to set up the auth flow [Link](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native) #DONE 
- Do an auth check on the auth screen, and then render the profile or sign in component depending on the session #DONE 
- Set up the profile picture and profile views #DONE 
- Image uploading #DONE 
- The profile picture changes on the client, but it does not get updated in the db #DONE 
##### In the sql functions i did not add my url and service key when copying them from the guide. After that i had single and double quotes around the url. Uploading correctly updates the profile now.
- Implement deep linking for verifying the email [Deep linking Guide](https://supabase.com/docs/guides/auth/native-mobile-deep-linking?platform=react-native)

## Combining Library and Deleted into one component
- The logic is the same, the only difference is the source being passed to the fetch location and the track component. Since there difference is only one variables, I can maybe pass it as a prop from the nav menu #DONE 
- While we're at it, let's move the tab modal into a component as it only needs the track as a prop #DONE 

## Prettier
- The formatter is barely doing anything, why is that?  #DONE 
#### It was because prettier was not set as the default formatter

## Tab url and context menu
- When the context menu of the first track reaches the second, the text of the second track has a higher z-index. Perhaps I will have to sent the context menu to the parent just like the tab modal. Or maybe it does not have to be absolute #DONE 
- Create a new component for the context menu #DONE 
- Style the tab modal, the slate background color does not look good #DONE 
- Text input extends beyond the screen width #DONE 
- Currently to find a url we have to leave the app and open a browser manually. Let's embed a link to the system browser/search engine to search for tabs and then go back #DONE  

## Single track page
- This will have to be a new screen #DONE 
- Users can click on the context menu open details option to access it #DONE 
- Additional option in the context menu on tracks in the library #DONE 
- Users can also access this page from the search results or the random track
- The screen should make a call to the audio analysis spotify endpoint that will give more data to work with.  #DONE 
- This api endpoint will be a new spotify endpoint in our spotify controller #DONE 
- Figure out why the single track page does not have a 100% opacity #DONE 
- Single track page details do not load on the first open, only after the second time #DONE 
##### The single track page is proving to be problematic, It might have something to do with the fact that it is a separate stack. The transparent nav theme seems to be affecting it. When I go back using the header, it works.
###### Turns out that the animation of the Stack.Navigator was causing the issue as the transition is problematic. I disabled it as there is no mention of this issue anywhere.
- Display the basic information #DONE 
- Display the tabs on the single track page for logged in users #DONE 
- create an endpoint to check if the user has added the track before displaying the tabs on the backend #DONE 
- Make the check on the front end to see if it was added 
Here we will display much more info about a track than before, for motivation let's use the notes in the main file


## Intermission - Installing it
- Generate an APK that we can install locally #DONE 
 [APK_URL](https://expo.dev/artifacts/eas/3VCd3Fy9B9vJ3d25BKYKaJ.apk)
- Install it and see how it feels to use it #DONE 
- Change icon, name and splash screen #DONE 

## Sign In/up Experience
- Show password button #DONE 
- Show error if the email is not valid
- DEEP LINKS #DONE 
##### When signing out the profile image should be reset #DONE 
- Add the Oauth providers(spotify and github) #DONE 
- Signing seems to be kind of buggy and is not refreshing or responsive at all even though the user will get signed in, maybe redirect on success #DONE 
- Icons for the provider log in #DONE 
- Reset password #DONE 
- Input validation to make sure that the email is valid before the buttons will make a request #DONE 
- Loading indicators when logging in #DONE 
- Show a message when requesting a magic link #DONE 

## Consistent Context menu design
- On the home page the context menu is still absolute, let's make it a dropdown like in lib/bin #DONE 

##### Loading spinner size prop
- Let's make the spinner more customizable instead of having a fixed size #DONE 

## Key confidence
- display the confidence percentage of the key #DONE  

## Music Theory Help
###### On the Detailed Track page, we have buttons for Scales, intervals, triads and chord progressions. When the user clicks on these buttons they should get diagrams and info on what will sound good in the key of the song.
Each button will lead to a new child screen of the single page track screen #DONE 
Correct the type errors when navigating to the track page #DONE 
- For intervals we can display each interval of the I chord #DONE 
##### It looks like all of these sub screens will require the same template to display the track information at the top. Let's create a common component. #DONE 
###### Add an explanation for the intervals, what does a major third actually mean? Now i know it is just 4 frets(2 semitones) from the root but this confused me for a while

#### Scales - [All Scales](https://pulse.berklee.edu/scales/index.html)
- Util function that will return the notes in a scale #DONE 
- Buttons to display all possible scales that can be selected #DONE 
- When clicking the button the notes of the scale with appear #DONE 
- Create a fretboard component to use to display the scales #DONE 
- Make it display Vertically #DONE 
- Sharps are not being displayed #DONE 
- Scales do not seem to be completely correctly, minor pentatonic is has misplaced notes #DONE 
- For Scales we can show diagrams of scales that will sound good in the current key #DONE 
#### Modes
- Same for modes as for the scales #DONE 
###### The Modes and Scales component are very similar but I think it is best that we keep them separated so that users can choose to focus on either scales or modes. However we can make it so that only one component is needed with just one param marking it as `scales` or `modes`
---



#### Study
- Create a new Screen where users can select their own key and then select the scales or modes #DONE 
- Style the picker screens as they are white text on white background currently #DONE 
#### Fretboard 
- Add option to display interval instead of note in the scales #DONE 
[Screen Orientation Docs](https://docs.expo.dev/versions/latest/sdk/screen-orientation/)
- When rotating the phone, the notes/interval should rotate #DONE 
- Manual rotate notes button #DONE 
- rotate the string names and fret index #DONE 
#### Fix the bottom nav text alignment on rotated screens
- Create context provider for global orientation state #DONE 
- Import the context in the fretboard component and update it globally #DONE 
- Use the global context in the bottom nav #DONE 
- Check if other UI changes are needed #Ongoing

#### Triads
- For triads we can show the different positions of each chord, this will not vary much between tracks. I will also need to research what triads are. Alright so i can display the possible triad shapes for each chord in the key #Research
_Major triads_ are built from the 1st (root), 3rd (major 3rd), and 5th 
(perfect 5th) degrees of the major scale.
_Minor triads_ are built from the 1st (root), 3rd (minor 3rd), and 5th (perfect 5th) degrees of the minor scale.
- When displaying triads in a certain key, use the Fretboard component to display all locations where these 3 intervals can be found #DONE 
- Button to switch between Major or Minor #DONE 
- Add triads to the Selector in the Study Screen #DONE 

#### Twelve bar blues
Twelve bar blues chart to play blues over any song. In the play section we can make it interactive
- Display a simple 3x4 chart showing the order of the chords in the key of the song #DONE 
- There is a bug when selecting G#, the correct notes are shown but G# is marked as G. All other sharps are correctly displayed #DONE 
- Show a horizontal scroll view of suggested scales to play in either the I, IV or V chord which can be selected by the user #DONE 
###### This can be encapsulated into a component as it is being used in multiple screens now #DONE 
- Clicking on the scale will open the fretboard as usual #DONE 
- Add triads to the list of suggested scales, perhaps in a separate row #DONE 
###### Ended up adding the same picker menu to select the scale type
- Add the twelve bars option in the study screen by first encapsulating the twelve bar display logic and turning it into a component #DONE 
- Make sure that scales and modes can still be selected when the twelve bars component is displayed #DONE 

#### Seventh Triads to target chord tones
After watching the video on SRV's Lenny, I think that 7th chords would be a good addition to the study page, especially for following a 12 bar blues progression
- Add a fourth option in the Study screen Picker to display the seventh chords #DONE 
- Figure out how to pick the seventh chords from the same `scaleslist` component #DONE I switched the selection to the Triad mode selector which has been repurposed to be used for seventh chords also
- Optional switch to add the fifth to the 7th chords #DONE 


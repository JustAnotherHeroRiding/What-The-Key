# [Api Docs](https://what-the-key.vercel.app/docs)
# [Icons](https://icons.expo.fyi/Index)


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
- Style the search results
- Add the close single result button inside of the component itself #DONE 
- Add tracks to library from the search results or random track
- Search results will be styled similar to spotify, small rows with small images of containers

##### Image Distortion
- Currently the left and right sides of the image are being distorted in the result card due to the image being stretched. Make sure that the image does not lose quality and is preserved

## Library
- See all tracks in the user's library
- Delete the tracks to send them to the recycle bin


## Deleted 
- See all tracks added to the recycle bin
- Restore tracks to library or delete them permanently

## Auth
- Log in and manage the library of tracks using the same database as the website #DONE 
- Use the supabase tutorial to set up the auth flow [Link](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native) #DONE 
- Do an auth check on the auth screen, and then render the profile or sign in component depending on the session #DONE 
- Set up the profile picture and profile views #DONE 
- Image uploading #DONE 
- The profile picture changes on the client, but it does not get updated in the db #DONE 
##### In the sql functions i did not add my url and service key when copying them from the guide. After that i had single and double quotes around the url. Uploading correctly updates the profile now.
- Implement deep linking for verifying the email [Deep linking Guide](https://supabase.com/docs/guides/auth/native-mobile-deep-linking?platform=react-native)

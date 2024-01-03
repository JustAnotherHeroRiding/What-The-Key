package com.example.whatthekey.ui.home

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Path
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import com.example.whatthekey.model.TrackData

class HomeViewModel : ViewModel() {

    interface SpotifyService {
        @GET("spotify/track/{id}")
        suspend fun fetchTrack(@Path("id") trackId: String): Response<TrackData>

        @GET("spotify/random-guitar-track")
        suspend fun fetchRandomGuitarTrack(): Response<List<TrackData>>
    }

    private val _trackData = MutableLiveData<TrackData>()

    val trackData: LiveData<TrackData> = _trackData

    private val _randomTrackData = MutableLiveData<TrackData>()

    val randomTrackData: LiveData<TrackData> = _randomTrackData


    fun fetchRandomTrack() {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                val retrofit = Retrofit.Builder()
                    .baseUrl("https://what-the-key.vercel.app/api/")
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                val spotifyService = retrofit.create(SpotifyService::class.java)
                val response = spotifyService.fetchRandomGuitarTrack()

                withContext(Dispatchers.Main) {
                    if (response.isSuccessful) {
                        // On success, switch to the main thread to update UI
                        val randomTrackData = response.body()?.getOrNull(0)
                        Log.d("Track Info", "Response successful ${randomTrackData}")
                        if (randomTrackData != null) {
                            _randomTrackData.value = randomTrackData
                        }

                    } else {
                        // Handle the case where the response is not successful
                        _randomTrackData.value = null
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    _randomTrackData.value = null
                }
                e.printStackTrace()

            }
        }
    }

    fun fetchTrackInfo() {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                val retrofit = Retrofit.Builder()
                    .baseUrl("https://what-the-key.vercel.app/api/")
                    .addConverterFactory(GsonConverterFactory.create())
                    //.client(client) Add this back to see the http logs again
                    .build()

                val spotifyService = retrofit.create(SpotifyService::class.java)
                val response = spotifyService.fetchTrack("1kHPOtD1fo3kWOgcs0oisd")

                withContext(Dispatchers.Main) {
                    if (response.isSuccessful) {
                        // On success, switch to the main thread to update UI
                        val trackData = response.body()
                        _trackData.value = trackData

                    } else {
                        // Handle the case where the response is not successful
                        _trackData.value = null
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    _trackData.value = null
                }
                e.printStackTrace()
            }
        }
    }

}

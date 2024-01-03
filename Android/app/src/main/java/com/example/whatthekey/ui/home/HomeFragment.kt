package com.example.whatthekey.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.whatthekey.databinding.FragmentHomeBinding
import com.bumptech.glide.Glide

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null

    // This property is only valid between onCreateView and onDestroyView.
    private val binding
        get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        val homeViewModel = ViewModelProvider(this).get(HomeViewModel::class.java)
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root

        // Set up observer
        homeViewModel.trackData.observe(viewLifecycleOwner) { trackInfo ->
            binding.textTrackName.text = trackInfo.track.name
            binding.trackAlbum.text = trackInfo.track.album.name
            Glide.with(this).load(trackInfo.track.album.images[0].url) // URL of the image
                .into(binding.trackImage)   // ImageView in which to load the image
        }

        homeViewModel.randomTrackData.observe(viewLifecycleOwner) { trackInfo ->
            binding.textTrackName.text = trackInfo.name
            binding.trackAlbum.text = trackInfo.album.name
            Glide.with(this).load(trackInfo.album.images[0].url)
                .into(binding.trackImage)
        }

        // Set up button click listener
        binding.buttonFetchTrack.setOnClickListener { homeViewModel.fetchTrackInfo() }
        binding.buttonFetchRandom.setOnClickListener { homeViewModel.fetchRandomTrack() }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

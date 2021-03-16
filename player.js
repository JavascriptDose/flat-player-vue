let app = new Vue({
    el: "#player",
    data: {
        video: {
            url: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4"
        },
        isFullScreen: false
    },

    mounted: function () {

        let events = [
            'timeupdate',
            'volumechange',
            'seeked',
            'loadedmetadata'
        ];

        events.map(e => {
            this.$refs.videoElem.addEventListener(e, () => {
                this.$forceUpdate();
            });
        });




        this.$refs.videoElem.addEventListener('loadedmetadata', () => {
            this.$refs.videoElem.volume = 0.3;
            this.$forceUpdate();
        });

        this.$refs.videoElem.addEventListener('click', () => {
            if (this.isPaused()) {
                this.play();
            } else {
                this.pause();
            }
        });

        this.$refs.videoElem.addEventListener('dblclick', () => {
            this.toggleFullScreen();
        });







    },

    methods: {

        muteToggle: function () {
            this.$refs.videoElem.muted = !this.$refs.videoElem.muted;
        },

        isMuted: function () {
            return this.$refs.videoElem ? this.$refs.videoElem.muted : false;
        },

        isPaused: function () {
            return this.$refs.videoElem ? this.$refs.videoElem.paused : true;
        },

        play: function () {
            this.$refs.videoElem.play();
        },

        pause: function () {
            this.$refs.videoElem.pause();
        },

        currentTime: function () {
            return this.$refs.videoElem?.currentTime || 0;
        },

        duration: function () {
            return this.$refs.videoElem?.duration || 0;
        },

        progressPercentage: function () {
            return (this.currentTime() / this.duration()) * 100;
        },

        formatTime: function (time) {
            if (!time || !parseInt(time)) {
                return `00:00`;
            }

            let hours, minutes, seconds;
            minutes = Math.floor(((time / 60) % 60)),
                seconds = Math.floor(time % 60),
                hours = Math.floor(time / 60 / 60);

            if (minutes < 10) minutes = `0${minutes}`;
            if (seconds < 10) seconds = `0${seconds}`;

            return `${hours ? hours + ':' : ''}${minutes}:${seconds}`;
        },

        skipVideo: function (event) {
            let wrapper_offset = event.currentTarget.getBoundingClientRect().left;
            let clicked_offset = event.clientX - wrapper_offset;

            let progress_width = (clicked_offset / event.currentTarget.getBoundingClientRect().width) * 100;
            let newTime = (this.duration() / 100) * progress_width;

            this.$refs.videoElem.currentTime = newTime;

        },

        toggleFullScreen: function () {
            screenfull.toggle();
            this.isFullScreen = !this.isFullScreen;
            this.$forceUpdate();
        },

        changeVolume: function (event) {
            let wrapper_offset = event.currentTarget.getBoundingClientRect().left;
            let clicked_offset = event.clientX - wrapper_offset;
            let volume_bar_width = (clicked_offset / event.currentTarget.getBoundingClientRect().width) * 100;
            this.$refs.videoElem.volume = volume_bar_width / 100;
        },

        volume: function () {
            return this.$refs.videoElem ? this.$refs.videoElem.volume * 100 : 0;
        }
    }
})
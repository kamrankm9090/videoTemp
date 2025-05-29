export const useMockData = () => {
  const tempVideoData1 = [
    {
      id: 0,
      url: 'https://www.shutterstock.com/shutterstock/videos/1096287727/preview/stock-footage-lorem-ipsum-fancy-text-placeholder-clip.mp4',
    },
    {
      id: 2,
      url: 'https://www.shutterstock.com/shutterstock/videos/3607670213/preview/stock-footage-frame-without-text-with-a-speech-bubble-against-colorful-lines-moving-on-vintage-red-and-beige.mp4',
    },
    {
      id: 3,
      url: 'https://www.shutterstock.com/shutterstock/videos/3614014009/preview/stock-footage-wow-text-on-speech-bubble-against-colorful-lines-moving-on-blue-background.mp4',
    },
    {
      id: 4,
      url: 'https://www.shutterstock.com/shutterstock/videos/3611947749/preview/stock-footage-frame-without-text-with-a-speech-bubble-against-colorful-lines-moving-on-purple-background.mp4',
    },
    {
      id: 5,
      url: 'https://www.shutterstock.com/shutterstock/videos/3611411375/preview/stock-footage-frame-without-text-with-a-speech-bubble-against-colorful-lines-moving-on-yellow-background.mp4',
    },
    {
      id: 6,
      url: 'https://www.shutterstock.com/shutterstock/videos/3614014083/preview/stock-footage-wow-text-on-speech-bubble-against-colorful-lines-moving-on-pink-background.mp4',
    },
    {
      id: 7,
      url: 'https://www.shutterstock.com/shutterstock/videos/3607670159/preview/stock-footage-frame-without-text-with-a-speech-bubble-against-colorful-lines-moving-on-pink-background.mp4',
    },
    {
      id: 8,
      url: 'https://www.shutterstock.com/shutterstock/videos/3611051485/preview/stock-footage-wow-text-on-speech-bubble-against-colorful-lines-moving-on-purple-background.mp4',
    },
    {
      id: 9,
      url: 'https://www.shutterstock.com/shutterstock/videos/1096287721/preview/stock-footage-lorem-ipsum-placeholder-clip-with-red-and-orange-animated-background.mp4',
    },
    {
      id: 10,
      url: 'https://www.shutterstock.com/shutterstock/videos/1029569669/preview/stock-footage-dnipro-ukraine-may-people-play-bumperball-zorbsoccer-outdoor-party-time-may-in.mp4',
    },
    {
      id: 11,
      url: 'https://media.istockphoto.com/id/1413207061/fi/video/tieliikenne-delhin-teill%C3%A4.mp4?s=mp4-640x640-is&k=20&c=iribF1qneIStE7YufLyv1ddLOJXardqQGBzskXWu-DI=',
    },
    {
      id: 12,
      url: 'https://media.istockphoto.com/id/1309022662/fi/video/vanhojen-kirjasivujen-selaaminen-l%C3%A4hikuva.mp4?s=mp4-640x640-is&k=20&c=baFHsTSQASigNx23bYW-p9JXZuu3-s8nab-nWK7tm4o=',
    },
    {
      id: 13,
      url: 'https://media.istockphoto.com/id/2044099144/fi/video/l%C3%A4hikuva-jossa-on-yksityiskohtia-kirjaimista-valkoisella-kirja-arkilla.mp4?s=mp4-640x640-is&k=20&c=e04TEpJsIA9cuoO_evK2YPZjP-ToOKtKtsyq5xXNxyg=',
    },
    {
      id: 14,
      url: 'https://media.istockphoto.com/id/1158722823/fi/video/animoitu-valkoinen-k%C3%A4sinkirjain-lause-hei-ven%C3%A4j%C3%A4ksi.mp4?s=mp4-640x640-is&k=20&c=EIC_YZxD1rB-A3pUCPSJHXXFvoxhwndNRqqERMAeYM0=',
    },
    {
      id: 15,
      url: 'https://media.istockphoto.com/id/474705144/fi/video/kirjallisuus-kiehkura.mp4?s=mp4-640x640-is&k=20&c=gSIOrTtnoe3glL3E3Alimv_DkthbcQXMgqv1x6sE6D0=',
    },
    {
      id: 16,
      url: 'https://media.istockphoto.com/id/905894524/fi/video/vihkisormukset-kirjasivulla.mp4?s=mp4-640x640-is&k=20&c=rA4w6w-1mW7PxBFciOHbY-em_6MhFfyGXYccqmLYO-w=',
    },
    {
      id: 17,
      url: 'https://media.istockphoto.com/id/2044099216/fi/video/l%C3%A4hikuva-jossa-on-yksityiskohtia-kirjaimista-valkoisella-kirja-arkilla.mp4?s=mp4-640x640-is&k=20&c=RJgYzKlrwQUPC-Tk8Mrq4gr6YgAguBZ9i6oNt5NXvRQ=',
    },
    {
      id: 18,
      url: 'https://media.istockphoto.com/id/2175937320/fi/video/uutisotsikko-joka-keskittyy-kriittiseen-toimintasuunnitelmaan-ja-ehdottaa-merkitt%C3%A4vi%C3%A4.mp4?s=mp4-640x640-is&k=20&c=0nkn6sEjBbSFmmObLiBa55mOU0FJRI8eqbvZfvK-3gQ=',
    },
    {
      id: 19,
      url: 'https://media.istockphoto.com/id/1281102272/fi/video/miksi-n%C3%A4k%C3%B6ni-on-ep%C3%A4selv%C3%A4.mp4?s=mp4-640x640-is&k=20&c=pfixBphGcs-qsDm_6MlNu2ccGCtbt4gX-wLZDRhWiQM=',
    },
    {
      id: 20,
      url: 'https://media.istockphoto.com/id/1416926932/fi/video/lesotho-teksti-joka-avautuu-ja-sulkeutuu.mp4?s=mp4-640x640-is&k=20&c=LyRPMiHqY0U91qgEYiMOynlEnjVYs3OMN-IKtbtgfW0=',
    },
    {
      id: 21,
      url: 'https://media.istockphoto.com/id/1157663018/fi/video/liikkuva-k%C3%A4sin-piirretty-k%C3%A4sikirjoitus-hello-ven%C3%A4j%C3%A4ksi-4k-toon.mp4?s=mp4-640x640-is&k=20&c=el2hAe650L-cxVObB6I3eRHGcNMn6K_QvV8gspjc43o=',
    },
    {
      id: 22,
      url: 'https://media.istockphoto.com/id/1303470377/fi/video/design-hashtag-valkoisella-taustalla-sosiaalisen-median-julkaisukonsepti.mp4?s=mp4-640x640-is&k=20&c=SkZPtKUEnm32ofTNvZ_4ETplY14bMFCbsbsn5nWQVuM=',
    },
    {
      id: 23,
      url: 'https://media.istockphoto.com/id/1295010036/fi/video/vaaleanpunainen-korostuskyn%C3%A4-merkitsee-sanamedian-makrokuva-valikoiva-kohdistus.mp4?s=mp4-640x640-is&k=20&c=TqLWB9K3IdOke0MUb1LsWP3adZE_TdHaipkOJ2NnslI=',
    },
    {
      id: 24,
      url: 'https://media.istockphoto.com/id/1295010036/fi/video/vaaleanpunainen-korostuskyn%C3%A4-merkitsee-sanamedian-makrokuva-valikoiva-kohdistus.mp4?s=mp4-640x640-is&k=20&c=TqLWB9K3IdOke0MUb1LsWP3adZE_TdHaipkOJ2NnslI=',
    },
    {
      id: 25,
      url: 'https://media.istockphoto.com/id/1202595938/fi/video/web-suunnittelun-esittely.mp4?s=mp4-640x640-is&k=20&c=erbAdwHMRz_1FZRBnyhjZHRETJs-2-01i8hjI8wV6CA=',
    },
    {
      id: 26,
      url: 'https://media.istockphoto.com/id/1310504331/fi/video/design-teksti-ponnahtaa-esiin-loupe-kuvakkeesta-k%C3%A4siteleike.mp4?s=mp4-640x640-is&k=20&c=i_HpFtK0mf9qkISYQ2w1ju_54nzAsXGdmK5YMmim0l8=',
    },
    {
      id: 27,
      url: 'https://media.istockphoto.com/id/1046702728/fi/video/tullisotateksti-liukenee-hiukkasiksi-ja-katoaa.mp4?s=mp4-640x640-is&k=20&c=KAh7ysUhVhq7K0vAZMnSdySevhoWA0PXCLewWICWgx4=',
    },
    {
      id: 28,
      url: 'https://media.istockphoto.com/id/2086950205/fi/video/videoteksti-uutiset.mp4?s=mp4-640x640-is&k=20&c=e2AnF7qeuZOq3zKpkrdGg0tUipvk1ybD2I6igUHTWmY=',
    },
    {
      id: 29,
      url: 'https://media.istockphoto.com/id/1357642131/fi/video/s%C3%A4hk%C3%B6isten-julkaisujen-rivill%C3%A4-oleva-taloudellinen-laiminly%C3%B6nti.mp4?s=mp4-640x640-is&k=20&c=Jv6QrxckSwhmIL667K8C2PZDYmpMRk-vCNvr7ynvqLA=',
    },
    {
      id: 30,
      url: 'https://media.istockphoto.com/id/2149795873/fi/video/valikkootsikon-kirjoittaminen-sivulle.mp4?s=mp4-640x640-is&k=20&c=OC6crFsLBxyqjWa5HaA-MU_hQHiS_EOCn_ELHsZahWE=',
    },
    {
      id: 31,
      url: 'https://media.istockphoto.com/id/1496159838/fi/video/osallistavat-kansalaisoikeudet-ja-lgbtq-tasa-arvo.mp4?s=mp4-640x640-is&k=20&c=zDBsyjKrKz9lqm2-cj7jQtXdJrWxoSBR8hWsoqwdsUU=',
    },
    {
      id: 32,
      url: 'https://media.istockphoto.com/id/1146521016/fi/video/infektiosana-tarkoittaa-englanninkielist%C3%A4-sanastoa-virussairauden-tarttumista-hygieniaa.mp4?s=mp4-640x640-is&k=20&c=Ck-c3b5pIepY3t8R0CNCWADJ0nDaLbzwK-OU-vfKhlM=',
    },
    {
      id: 33,
      url: 'https://media.istockphoto.com/id/1077094000/fi/video/inspiroivia-sanoja-tekstikineettinen-typografia-animaatio.mp4?s=mp4-640x640-is&k=20&c=F_XX-kYYLKKh47gaYAPV8bimzq7apVLyL1gT5NL-zRI=',
    },
    {
      id: 34,
      url: 'https://media.istockphoto.com/id/2148310126/fi/video/palestiinan-tekstiuutiset.mp4?s=mp4-640x640-is&k=20&c=tr9-5kWufQtyEI4mLGOCu1ElCOL8ETIvStSocVR9aCs=',
    },
    {
      id: 35,
      url: 'https://media.istockphoto.com/id/1206495384/fi/video/hiiri-napsauttaa-tykk%C3%A4%C3%A4-painiketta-tilaa-painiketta-ja-kelloilmoitusta-haluatko-ett%C3%A4.mp4?s=mp4-640x640-is&k=20&c=twEoZweYbNTKW2V0Tz63g1TD96HUQgn6SDcWEok3Xh8=',
    },
    {
      id: 36,
      url: 'https://media.istockphoto.com/id/507983427/fi/video/laki.mp4?s=mp4-640x640-is&k=20&c=rcsFumFQYNohYn3_7EDh3HIBQFFh61TvwP_sNAe280I=',
    },
  ];

  const tempVideoData2 = [
    {
      id: 0,
      url: 'BigBuckBunny.[0].mp4',
    },
    {
      id: 1,
      url: 'BigBuckBunny.[1].mp4',
    },
    {
      id: 2,
      url: 'BigBuckBunny.[2].mp4',
    },
    {
      id: 3,
      url: 'BigBuckBunny.[3].mp4',
    },
    {
      id: 4,
      url: 'BigBuckBunny.[4].mp4',
    },
    {
      id: 5,
      url: 'BigBuckBunny.[5].mp4',
    },
    {
      id: 6,
      url: 'BigBuckBunny.[6].mp4',
    },
    {
      id: 7,
      url: 'BigBuckBunny.[7].mp4',
    },
    {
      id: 8,
      url: 'BigBuckBunny.[8].mp4',
    },
    {
      id: 9,
      url: 'BigBuckBunny.[9].mp4',
    },
    {
      id: 10,
      url: 'BigBuckBunny.[10].mp4',
    },
    {
      id: 11,
      url: 'BigBuckBunny.[11].mp4',
    },
    {
      id: 12,
      url: 'BigBuckBunny.[12].mp4',
    },
    {
      id: 13,
      url: 'BigBuckBunny.[13].mp4',
    },
    {
      id: 14,
      url: 'BigBuckBunny.[14].mp4',
    },
    {
      id: 15,
      url: 'BigBuckBunny.[15].mp4',
    },

    {
      id: 16,
      url: 'file-1.mp4',
    },
    {
      id: 17,
      url: 'file-2.mp4',
    },
    {
      id: 18,
      url: 'file-3.mp4',
    },
    {
      id: 19,
      url: 'file-4.mp4',
    },
    {
      id: 20,
      url: 'file-5.mp4',
    },
    {
      id: 21,
      url: 'file-6.mp4',
    },
    {
      id: 22,
      url: 'file-7.mp4',
    },
    {
      id: 23,
      url: 'file-8.mp4',
    },
    {
      id: 24,
      url: 'file-9.mp4',
    },
    {
      id: 25,
      url: 'file-10.mp4',
    },
    {
      id: 26,
      url: 'file-11.mp4',
    },
    {
      id: 27,
      url: 'file-12.mp4',
    },
    {
      id: 28,
      url: 'file-13.mp4',
    },
    {
      id: 29,
      url: 'file-14.mp4',
    },
    {
      id: 30,
      url: 'file-15.mp4',
    },
    {
      id: 31,
      url: 'file-16.mp4',
    },
    {
      id: 32,
      url: 'file-17.mp4',
    },
    {
      id: 33,
      url: 'file-18.mp4',
    },
    {
      id: 34,
      url: 'file-19.mp4',
    },
    {
      id: 35,
      url: 'file-20.mp4',
    },
    {
      id: 36,
      url: 'file-21.mp4',
    },
    {
      id: 37,
      url: 'file-22.mp4',
    },
    {
      id: 38,
      url: 'file-23.mp4',
    },
    {
      id: 39,
      url: 'file-24.mp4',
    },
    {
      id: 40,
      url: 'file-25.mp4',
    },
    {
      id: 41,
      url: 'file-26.mp4',
    },
    {
      id: 42,
      url: 'file-27.mp4',
    },
    {
      id: 43,
      url: 'file-28.mp4',
    },
    {
      id: 44,
      url: 'file-29.mp4',
    },
    {
      id: 45,
      url: 'file-30.mp4',
    },
    {
      id: 46,
      url: 'file-31.mp4',
    },
    {
      id: 47,
      url: 'file-32.mp4',
    },
    {
      id: 48,
      url: 'file-33.mp4',
    },
    {
      id: 49,
      url: 'file-34.mp4',
    },
    {
      id: 50,
      url: 'file-35.mp4',
    },
    {
      id: 51,
      url: 'file-36.mp4',
    },
  ];

  const movies = [
    {
      description:
        "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttps://www.bigbuckbunny.org",
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      subtitle: 'By Blender Foundation',
      thumb: 'images/BigBuckBunny.jpg',
      title: 'Big Buck Bunny',
    },
    {
      description: 'The first Blender Open Movie from 2006',
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      subtitle: 'By Blender Foundation',
      thumb: 'images/ElephantsDream.jpg',
      title: 'Elephant Dream',
    },
    {
      description:
        'HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.',
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      subtitle: 'By Google',
      thumb: 'images/ForBiggerBlazes.jpg',
      title: 'For Bigger Blazes',
    },
    {
      description:
        "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      subtitle: 'By Google',
      thumb: 'images/ForBiggerEscapes.jpg',
      title: 'For Bigger Escape',
    },
    {
      description:
        'Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.',
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      subtitle: 'By Google',
      thumb: 'images/ForBiggerFun.jpg',
      title: 'For Bigger Fun',
    },
    {
      description:
        'Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.',
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      subtitle: 'By Google',
      thumb: 'images/ForBiggerJoyrides.jpg',
      title: 'For Bigger Joyrides',
    },
    {
      description:
        "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.",
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      subtitle: 'By Google',
      thumb: 'images/ForBiggerMeltdowns.jpg',
      title: 'For Bigger Meltdowns',
    },
    {
      description:
        'Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org',
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      subtitle: 'By Blender Foundation',
      thumb: 'images/Sintel.jpg',
      title: 'Sintel',
    },
    {
      description:
        'Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.',
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      subtitle: 'By Garage419',
      thumb: 'images/SubaruOutbackOnStreetAndDirt.jpg',
      title: 'Subaru Outback On Street And Dirt',
    },
    {
      description:
        'Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - https://www.tearsofsteel.org',
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      subtitle: 'By Blender Foundation',
      thumb: 'images/TearsOfSteel.jpg',
      title: 'Tears of Steel',
    },
    {
      description:
        "The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most requested car of 2010, the Volkswagen GTI. Will it beat the Mazdaspeed3's standard-setting lap time? Watch and see...",
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
      subtitle: 'By Garage419',
      thumb: 'images/VolkswagenGTIReview.jpg',
      title: 'Volkswagen GTI Review',
    },
    {
      description:
        'The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, and posting a video from the road every single day! The only place to watch them is by subscribing to The Smoking Tire or watching at BlackMagicShine.com',
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      subtitle: 'By Garage419',
      thumb: 'images/WeAreGoingOnBullrun.jpg',
      title: 'We Are Going On Bullrun',
    },
    {
      description:
        'The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.',
      sources:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      subtitle: 'By Garage419',
      thumb: 'images/WhatCarCanYouGetForAGrand.jpg',
      title: 'What care can you get for a grand?',
    },
  ];

  return {tempVideoData1, tempVideoData2, movies};
};

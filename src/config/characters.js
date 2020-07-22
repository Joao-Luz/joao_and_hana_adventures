const characters =
[
    {
        id: 0,
        character: 'ants',
        speed: 2,
        texture: 'ants',
        anims: 'ants_anim'
    },
    {
        id: 1,
        character: 'moths',
        speed: 3,
        texture: 'moths',
        anims: 'moths_anim',
        offsetY: -34

    },
    {
        id: 2,
        character: 'hana',
        texture: 'hana',
        model: 'hana_model',
        anims: {
            run: {
                key: 'hana_run',
                width: 15,
                height: 53
            },
            jump: {
                key: 'hana_jump',
                width: 22,
                height: 49
            },
            slide: {
                key: 'hana_slide',
                width: 45,
                height: 30,
                offsetY: 24
            },
            fall: {
                key: 'hana_fall',
                width: 45,
                height: 30,
                offsetY: 24
            }
        },
        life: 3,
        sounds: [
            {
                key: 'step',
                config: {
                    rate: 0.58 ,
                    loop: true,
                    volume: 1
                }
            },
            {
                key: 'jump',
                config: {
                    rate: 1,
                    loop: false,
                    volume: 0.25
                }
            },
            {
                key: 'slide',
                config: {
                    rate: 1,
                    loop: false,
                    volume: 0.05
                }
            },
            {
                key: 'hit',
                config: {
                    rate: 1,
                    loop: false,
                    volume: 0.25
                }
            },
        ]
    },
    {
        id: 3,
        character: 'joao',
        texture: 'joao',
        model: 'joao_model',
        anims: {
            run: {
                key: 'joao_run',
                width: 32,
                height: 58
            },
            jump: {
                key: 'joao_jump',
                width: 34,
                height: 58
            },
            slide: {
                key: 'joao_slide',
                width: 46,
                height: 31,
                offsetY: 27
            },
            fall: {
                key: 'joao_fall',
                width: 50,
                height: 19
            },
            hold: {
                key: 'joao_hold',
                width: 50,
                height: 40 
            }
        },
        life: 3,
        sounds: [
            {
                key: 'step',
                config: {
                    rate: 0.58 ,
                    loop: true,
                    volume: 1
                }
            },
            {
                key: 'jump',
                config: {
                    rate: 1,
                    loop: false,
                    volume: 0.25
                }
            },
            {
                key: 'slide',
                config: {
                    rate: 1,
                    loop: false,
                    volume: 0.05
                }
            },
            {
                key: 'hit',
                config: {
                    rate: 1,
                    loop: false,
                    volume: 0.25
                }
            },
        ]
    },
    {
        id: 4,
        character: 'meg',
        texture: 'meg',
        anims: {
            run: {
                key: 'meg_run'
            },
            bark: {
                key: 'meg_bark'
            },
            wait: {
                key: 'meg_wait'
            },
            stop: {
                key: 'meg_stop'
            },
        },
        sounds: [
            {
                key: 'bark',
                config: {
                    rate: 1 ,
                    loop: false,
                    volume: 1
                }
            },
            {
                key: 'grunt',
                config: {
                    rate: 1 ,
                    loop: false,
                    volume: 0.5
                }
            }
        ]
    },
    {
        id: 5,
        character: 'caramelo',
        texture: 'caramelo',
        anims: {
            run: {
                key: 'caramelo_run'
            },
            wait: {
                key: 'caramelo_wait'
            }
        },
        sounds: [
            {
                key: 'meow',
                config: {
                    rate: 1 ,
                    loop: false,
                    volume: 1
                }
            },
            {
                key: 'purr',
                config: {
                    rate: 1 ,
                    loop: false,
                    volume: 0.5
                }
            }
        ]
    }
]

export default characters;
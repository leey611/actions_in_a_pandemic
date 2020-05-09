const textElement = document.getElementById('text');
const svgDiv = document.getElementById('svgDiv');
const optionButtonsElement = document.getElementById('option-buttons');
const nextBtnElement = document.querySelector('.next');
const finalSceneElement = document.getElementById('finalScene');

let state = {
    
}

let questionIndex = 0;

function startGame() {
    showTextNode(questionIndex);
    
}

function showTextNode(textNodeIndex) {
    while(optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    nextBtnElement.style.visibility = 'hidden';
    nextBtnElement.style.display = 'none';
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    svgDiv.innerHTML = `<img src="assets/svg${textNode.id}.svg">`;
    
    
    if (textNode.type === 'intro') {
        console.log('intro')
        nextBtnElement.innerText = 'Start';
        nextBtnElement.style.visibility = 'visible';
        nextBtnElement.style.display = "block";
    }
    else if (textNode.options) {
    textNode.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('option-btn');
        
        button.addEventListener('click', () => {
            option.selected = !option.selected;
            if (textNode.type === 'single') {
                questionIndex++;
                
                showTextNode(questionIndex);
            } else if (textNode.type === 'multiple') {
                button.classList.toggle('selected');
                var showBtn = false;
                console.log(showBtn)
                for (var i = 0; i < textNode.options.length; i++) {
                    showBtn = showBtn || textNode.options[i].selected;
                }
                if (showBtn === true) {
                    nextBtnElement.style.display = "block";
                    nextBtnElement.style.visibility = "visible";
                    nextBtnElement.innerText = 'Next';
                } else {
                    nextBtnElement.style.visibility = "hidden";
                    nextBtnElement.style.display = 'none';
                }
                
            } 
        });
        optionButtonsElement.appendChild(button);
        
    })
    } else if (textNode.type === 'final') {
        textNodes.forEach(textNode => {
            if (textNode.options) {
                optionButtonsElement.innerHTML += `<div class="finalSceneNode">
                                                <div class="finalText">${textNode.text}</div>
                                                <div class="finalOptionsContainer">${printOptionsFinal(textNode.options)}</div>
                                            </div>`;
            
            
            }
        })
        
        nextBtnElement.style.visibility = 'visible';
        nextBtnElement.style.display = 'block';
        nextBtnElement.innerText = 'Restart';
        
    }
    
    console.log(questionIndex);
}

nextBtnElement.addEventListener('click', () => {
    questionIndex++;
    if (questionIndex > textNodes.length -1) {
        questionIndex = 0;
        //set all selected back to false (RECOVER ALL THE OPTIONS)
        textNodes = [
            {
                id: 0,
                type: 'intro',
                text: "Virus is the greatest threat in the modern society. If an unknown virus appears around your life, what would you do?"
            },
            {
                id: 1,
                type: 'single',
                text: 'Recently, a new virus has been found outside of the country, but people are saying that it cannot be spread by humans...',
                options: [
                    {
                        text: 'Who cares?',
                        selected: false
                    },
                    {
                        text: 'Be skeptical and cautious',
                        flags: ['Taiwan'],
                        selected: false
                    },
                    {
                        text: 'Trust the information',
                        selected: false
                    }
                ]
            },
            {
                id: 2,
                type: 'single',
                text: 'Other countries said that the virus has spread to their countries. What actions would you take IMMEDIATELY?',
                options: [
                    {
                        text: 'Inspect travelers who have been to those countries',
                        flags: ['Taiwan', 'Korea'],
                        selected: false
                    },
                    {
                        text: 'Do nothing for herd immunity',
                        flags: ['UK'],
                        selected: false
                    },
                    {
                        text: 'Impose travel restrictions and border control',
                        flags: ['Taiwan'],
                        selected: false
                    }
                ]
            },
            {
                id: 3,
                type: 'multiple',
                text: 'Unfortunately, the virus has spread to your country. If you were the government, what would you do? (Multiple choice)',
                options: [
                    {
                        text: 'Set up the Central Epidemic Command Center',
                        flags: ['Taiwan'],
                        selected: false
                    },
                    {
                        text: 'Manage the distribution and usage of medical equipment',
                        flags: ['Taiwan'],
                        selected: false
                    },
                    {
                        text: 'Ban large events, gatherings, and activities',
                        flags: ['US'],
                        selected: false
                    },
                    {
                        text: "Use technology to do contact tracing",
                        flags: ['Korea', 'Singapore', 'Taiwan'],
                        selected: false
                    },
                    {
                        text: "Shot the confirmed cases",
                        flags: ['North Korea'],
                        selected: false
                    },
                    {
                        text: 'Lock down hotspots (partial or full)',
                        flags: ['Australia','Argentina','Belgium', 'Canada','China','Croatia','Czech', 'Denmark','France','Germany','Greece','Hungary','India', 'Italy', 'Jordan','Malaysia', 'Norway','Peru','Poland','Russia', 'Singapore', 'Spain','Sweden','Thailand'],
                        selected: false
                    },
                    {
                        text: 'Set an official social media account where the citizens can track the latest news',
                        flags: ['Taiwan'],
                        selected: false
                    },
                    {
                        text: 'Implement large-scale virus testing',
                        flags: ['Bulgaria', 'Germany', 'Korea', 'Singapore', 'US'],
                        selected: false
                    }
                ]
            },
            {
                id: 4,
                type: 'single',
                text: 'The virus has continued to spread! What mask policy will you enforce?',
                options: [
                    {
                        text: 'Face masks should be supplied by the government. No sales are allowed in the market',
                        flags: ['Singapore'],
                        selected: false
                    },
                    {
                        text: 'Ban face mask exports for a month',
                        flags: ['Taiwan'],
                        selected: false
                    },
                    {
                        text: 'Implement a mask-rationing plan',
                        flags: ['Korea', 'Taiwan'],
                        selected: false
                    },
                    {
                        text: 'Import face masks',
                        flags: ['US']
                    },
                    {
                        text: 'Take no actions but encourage private production',
                        selected: false
                    }
                ]
            },
            {
                id: 5,
                type: 'multiple',
                text: 'Facing this unknown virus, what will you educate about or recommend to the public? (Multiple choice)',
                options: [
                    {
                        text: "Don't wear a mask if you are not sick",
                        flags: ['France', 'US', 'WHO'],
                        selected: false
                    },
                    {
                        text: 'Wash your hands more frequently',
                        flags: ['Worldwide'],
                        selected: false
                    },
                    {
                        text: 'Clap at 7pm for the helpers every day',
                        flags: ['US', 'UK'],
                        selected: false
                    },
                    {
                        text: 'Practice social distancing: stay 6 feet apart',
                        flags: ['Worldwide'],
                        selected: false
                    },
                    {
                        text: 'Accept that we are going to die',
                        selected: false   
                    }
                ]
            },
            {
                id: 6,
                type: 'single',
                text: "Your country's economy took a hit due to the virus. What policy will you enforce?",
                options: [
                    {
                        text: 'Universal Basic Income',
                        selected: false
                    },
                    {
                        text: 'Corporate tax deductions and low interest rate loans',
                        selected: false
                    },
                    {
                        text: 'Free food distribution',
                        flags: ['US'],
                        selected: false
                    },
                    {
                        text: 'Stimulus checks for low income people',
                        flags: ['US'],
                        selected: false
                    }
                ]
            },
            {
                id: 7,
                type: 'multiple',
                text: 'If your country beats the virus, how will you help other countries? (Multiple choice)',
                options: [
                    {
                        text: 'Treating patients of other countries',
                        flags: ['Germany'],
                        selected: false
                    },
                    {
                        text: 'Donate masks or medical equipment to other countires',
                        flags: ['China', 'Korea', 'Taiwan'],
                        selected: false
                    }
                ]
            },
            {
                id: 8,
                type: 'final',
                text: "You have made your own choices. However, it is also important to understand how other countries confront the virus in real life, and how intense a virus can be. Now, see your choices compared to other countries', is there anything you want to change?"
            }
        ]
    }
    showTextNode(questionIndex);
})

function printOptionsFinal(optionsArray) {
    let toInsert = '';
    for (let i = 0; i < optionsArray.length; i++) {
        toInsert += optionsArray[i].selected ? `<div>
                                                    <div class="finalOption selected">${optionsArray[i].text}:   
                                                    <ul>${showPlaces(optionsArray[i])}</ul>
                                                    </div>
                                                    
                                                </div$>`
                                                 :
                                               `<div>
                                                    <div class="finalOption">${optionsArray[i].text}  
                                                    <ul>${showPlaces(optionsArray[i])}</ul>
                                                    </div>
                                                    
                                                </div>`
    }
    return toInsert
}

function showPlaces(singleOption) {
    let toInsert = '';
    if (singleOption.flags) {
        for (let i = 0; i < singleOption.flags.length; i++) {
        toInsert += `<li>${singleOption.flags[i]}</li>`
    }
    }
    
    return toInsert
}

function selectOption(option) {

}



let textNodes = [
    {
        id: 0,
        type: 'intro',
        text: "Virus is the greatest threat in the modern society. If an unknown virus appears around your life, what would you do?"
    },
    {
        id: 1,
        type: 'single',
        text: 'Recently, a new virus has been found outside of the country, but people are saying that it cannot be spread by humans...',
        options: [
            {
                text: 'Who cares?',
                selected: false
            },
            {
                text: 'Be skeptical and cautious',
                flags: ['Taiwan'],
                selected: false
            },
            {
                text: 'Trust the information',
                selected: false
            }
        ]
    },
    {
        id: 2,
        type: 'single',
        text: 'Other countries said that the virus has spread to their countries. What actions would you take IMMEDIATELY?',
        options: [
            {
                text: 'Inspect travelers who have been to those countries',
                flags: ['Taiwan', 'Korea'],
                selected: false
            },
            {
                text: 'Do nothing for herd immunity',
                flags: ['UK'],
                selected: false
            },
            {
                text: 'Impose travel restrictions and border control',
                flags: ['Taiwan'],
                selected: false
            }
        ]
    },
    {
        id: 3,
        type: 'multiple',
        text: 'Unfortunately, the virus has spread to your country. If you were the government, what would you do? (Multiple choice)',
        options: [
            {
                text: 'Set up the Central Epidemic Command Center',
                flags: ['Taiwan'],
                selected: false
            },
            {
                text: 'Manage the distribution and usage of medical equipment',
                flags: ['Taiwan'],
                selected: false
            },
            {
                text: 'Ban large events, gatherings, and activities',
                flags: ['US'],
                selected: false
            },
            {
                text: "Use technology to do contact tracing",
                flags: ['Korea', 'Singapore', 'Taiwan'],
                selected: false
            },
            {
                text: "Shot the confirmed cases",
                flags: ['North Korea'],
                selected: false
            },
            {
                text: 'Lock down hotspots (partial or full)',
                flags: ['Australia','Argentina','Belgium', 'Canada','China','Croatia','Czech', 'Denmark','France','Germany','Greece','Hungary','India', 'Italy', 'Jordan','Malaysia', 'Norway','Peru','Poland','Russia', 'Singapore', 'Spain','Sweden','Thailand'],
                selected: false
            },
            {
                text: 'Set an official social media account where the citizens can track the latest news',
                flags: ['Taiwan'],
                selected: false
            },
            {
                text: 'Implement large-scale virus testing',
                flags: ['Bulgaria', 'Germany', 'Korea', 'Singapore', 'US'],
                selected: false
            }
        ]
    },
    {
        id: 4,
        type: 'single',
        text: 'The virus has continued to spread! What mask policy will you enforce?',
        options: [
            {
                text: 'Face masks should be supplied by the government. No sales are allowed in the market',
                flags: ['Singapore'],
                selected: false
            },
            {
                text: 'Ban face mask exports for a month',
                flags: ['Taiwan'],
                selected: false
            },
            {
                text: 'Implement a mask-rationing plan',
                flags: ['Korea', 'Taiwan'],
                selected: false
            },
            {
                text: 'Import face masks',
                flags: ['US']
            },
            {
                text: 'Take no actions but encourage private production',
                selected: false
            }
        ]
    },
    {
        id: 5,
        type: 'multiple',
        text: 'Facing this unknown virus, what will you educate about or recommend to the public? (Multiple choice)',
        options: [
            {
                text: "Don't wear a mask if you are not sick",
                flags: ['France', 'US', 'WHO'],
                selected: false
            },
            {
                text: 'Wash your hands more frequently',
                flags: ['Worldwide'],
                selected: false
            },
            {
                text: 'Clap at 7pm for the helpers every day',
                flags: ['US', 'UK'],
                selected: false
            },
            {
                text: 'Practice social distancing: stay 6 feet apart',
                flags: ['Worldwide'],
                selected: false
            },
            {
                text: 'Accept that we are going to die',
                selected: false   
            }
        ]
    },
    {
        id: 6,
        type: 'single',
        text: "Your country's economy took a hit due to the virus. What policy will you enforce?",
        options: [
            {
                text: 'Universal Basic Income',
                selected: false
            },
            {
                text: 'Corporate tax deductions and low interest rate loans',
                selected: false
            },
            {
                text: 'Free food distribution',
                flags: ['US'],
                selected: false
            },
            {
                text: 'Stimulus checks for low income people',
                flags: ['US'],
                selected: false
            }
        ]
    },
    {
        id: 7,
        type: 'multiple',
        text: 'If your country beats the virus, how will you help other countries? (Multiple choice)',
        options: [
            {
                text: 'Treating patients of other countries',
                flags: ['Germany'],
                selected: false
            },
            {
                text: 'Donate masks or medical equipment to other countires',
                flags: ['China', 'Korea', 'Taiwan'],
                selected: false
            }
        ]
    },
    {
        id: 8,
        type: 'final',
        text: "You have made your own choices. However, it is also important to understand how other countries confront the virus in real life, and how intense a virus can be. Now, see your choices compared to other countries', is there anything you want to change?"
    }
]

startGame();
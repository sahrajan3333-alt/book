/**
 * Folio - Digital Reading & Writers Community
 * Built-in Library Data: Free Public Domain Classics & Modern Book Summaries
 */

const INITIAL_CLASSICS = [
  {
    id: "classic-sherlock",
    type: "classic",
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    year: 1892,
    genre: "Detective & Mystery",
    rating: 4.9,
    coverColor: "linear-gradient(135deg, #1e3d34 0%, #0d1e18 100%)",
    accentColor: "#2d5a49",
    description: "The timeless investigative exploits of the world's first consulting detective, Sherlock Holmes, and his loyal biographer, Dr. John H. Watson, traversing Victorian London.",
    readTime: "25 min excerpt",
    tags: ["Victorian", "Mystery", "Deduction", "London"],
    chapters: [
      {
        id: "sh-ch1",
        title: "Chapter I: A Scandal in Bohemia - Part 1",
        subtitle: "The Woman and the Masked Visitor",
        content: `To Sherlock Holmes she is always THE woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer. They were admirable things for the observer—excellent for drawing the veil from men's motives and actions. But for the trained reasoner to admit such intrusions into his own delicate and finely adjusted temperament was to introduce a distracting factor which might throw a doubt upon all his mental results.

Grit in a sensitive instrument, or a crack in one of his own high-power lenses, would not be more disturbing than a strong emotion in a nature such as his. And yet there was but one woman to him, and that woman was the late Irene Adler, of dubious and questionable memory.

I had seen little of Holmes lately. My marriage had drifted us away from each other. My own complete happiness, and the home-centred interests which rise up around the man who first finds himself master of his own establishment, were sufficient to absorb all my attention; while Holmes, who loathed every form of society with his whole Bohemian soul, remained in our lodgings in Baker Street, buried among his old books, and alternating from week to week between cocaine and ambition, the drowsiness of the drug, and the fierce energy of his own keen nature. He was still, as ever, deeply attracted by the study of crime, and occupied his immense faculties and extraordinary powers of observation in following out those clues, and clearing up those mysteries which had been abandoned as hopeless by the official police.

One night—it was on the twentieth of March, 1888—I was returning from a journey to a patient (for I had now returned to civil practice), when my way led me through Baker Street. As I passed the well-remembered door, which must always be associated in my mind with my wooing, and with the dark incidents of the Study in Scarlet, I was seized with a keen desire to see Holmes again, and to know how he was employing his extraordinary powers. His rooms were brilliantly lit, and, even as I looked up, I saw his tall, spare figure pass twice in a dark silhouette against the blind. He was pacing the room swiftly, eagerly, with his head sunk upon his chest and his hands clasped behind him. To me, who knew his every mood and habit, his attitude and manner told their own story. He was at work again. He had risen out of his drug-created dreams and was hot upon the scent of some new problem. I rang the bell and was shown up to the chamber which had formerly been in part my own.`
      },
      {
        id: "sh-ch2",
        title: "Chapter II: A Scandal in Bohemia - Part 2",
        subtitle: "The Science of Observation",
        content: `His manner was not effusive. It seldom was; but he was glad, I think, to see me. With hardly a word spoken, but with a kindly eye, he waved me to an armchair, threw across his case of cigars, and indicated an alcove where spirits stood beside a gasogene. Then he stood before the fire and looked me over in his singular introspective fashion.

"Wedlock suits you," he remarked. "I think, Watson, that you have put on seven and a half pounds since I saw you."

"Seven!" I answered.

"Indeed, I should have thought a little more. Just a trifle more, I fancy, Watson. And in practice again, I observe. You did not tell me that you intended to go into harness."

"Then, how do you know?"

"I see it, I deduce it. How do you know that you have been getting yourself very wet lately, and that you have a most clumsy and careless servant girl?"

"My dear Holmes," said I, "this is too much. You would certainly have been burned, had you lived a few centuries ago. It is quite true that I had a country walk on Thursday and came home in a dreadful mess, but as I have changed my clothes I can't imagine how you deduce it. As to Mary Jane, she is incorrigible, and my wife has given her notice, but there, again, I fail to see how you work it out."

He chuckled to himself and rubbed his long, nervous hands together.

"It is simplicity itself," said he; "my eyes tell me that on the inside of your left shoe, just where the firelight strikes it, the leather is scored by six almost parallel cuts. Obviously they have been caused by someone who has very carelessly scraped round the edges of the sole in order to remove crusted mud from it. Hence, you see, my double deduction that you had been out in vile weather, and that you had a particularly malignant boot-slitting specimen of the London slavey. As to your practice, if a gentleman walks into my rooms smelling of iodoform, with a black mark of nitrate of silver upon his right forefinger, and a bulge on the right side of his top-hat to show where he has secreted his stethoscope, I must be dull indeed if I do not pronounce him to be an active member of the medical profession."

I could not help laughing at the ease with which he explained his process of deduction. "When I hear you give your reasons," I remarked, "the thing always appears to me to be so ridiculously simple that I could easily do it myself, though at each successive instance of your reasoning I am baffled until you explain your process. And yet I believe that my eyes are as good as yours."

"Quite so," he answered, lighting a cigarette, and throwing himself down into an armchair. "You see, but you do not observe. The distinction is clear. For example, you have frequently seen the steps which lead up from the hall to this room."

"Frequently."

"How often?"

"Well, some hundreds of times."

"Then how many are there?"

"How many? I don't know."

"Quite so! You have not observed. And yet you have seen. That is just my point. Now, I know that there are seventeen steps, because I have both seen and observed."`
      }
    ]
  },
  {
    id: "classic-pride-prejudice",
    type: "classic",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Classic Romance & Satire",
    rating: 4.95,
    coverColor: "linear-gradient(135deg, #2b3a42 0%, #152228 100%)",
    accentColor: "#3d5360",
    description: "Jane Austen's sparkling romantic masterpiece tracing the spirited Elizabeth Bennet and the proud Mr. Darcy through wit, societal mores, and mistaken judgments.",
    readTime: "20 min excerpt",
    tags: ["Romance", "Regency", "Classic", "Wit"],
    chapters: [
      {
        id: "pp-ch1",
        title: "Chapter I: Netherfield Park is Let at Last",
        subtitle: "A Truth Universally Acknowledged",
        content: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.

"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"

Mr. Bennet replied that he had not.

"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."

Mr. Bennet made no answer.

"Do you not want to know who has taken it?" cried his wife impatiently.

"YOU want to tell me, and I have no objection to hearing it."

This was invitation enough.

"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week."

"What is his name?"

"Bingley."

"Is he married or single?"

"Oh! Single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!"

"How so? How can it affect them?"

"My dear Mr. Bennet," replied his wife, "how can you be so tiresome! You must know that I am thinking of his marrying one of them."

"Is that his design in settling here?"

"Design! Nonsense, how can you talk so! But it is very likely that he MAY fall in love with one of them, and therefore you must visit him as soon as he comes."

"I see no occasion for that. You and the girls may go, or you may send them by themselves, which perhaps will be still better, for as you are as handsome as any of them, Mr. Bingley may like you the best of the party."

"My dear, you flatter me. I certainly HAVE had my share of beauty, but I do not pretend to be anything extraordinary now. When a woman has five grown-up daughters, she ought to give over thinking of her own beauty."

"In such cases, a woman has not often much beauty to think of."

"But, my dear, you must indeed go and see Mr. Bingley when he comes into the neighbourhood."

"It is more than I engage for, I assure you."`
      },
      {
        id: "pp-ch2",
        title: "Chapter II: Mr. Bennet's Little Surprise",
        subtitle: "The Unheralded Call",
        content: `Mr. Bennet was among the earliest of those who waited on Mr. Bingley. He had always intended to visit him, though to the last always assuring his wife that he should not go; and till the evening after the visit was paid she had no knowledge of it. It was then disclosed in the following manner. Observing his second daughter employed in trimming a hat, he suddenly addressed her with:

"I hope Mr. Bingley will like it, Lizzy."

"We are not in a way to know what Mr. Bingley likes," said her mother resentfully, "since we are not to visit."

"But you forget, mamma," said Elizabeth, "that we shall meet him at the assemblies, and that Mrs. Long promised to introduce him."

"I do not believe Mrs. Long will do any such thing. She has two nieces of her own. She is a selfish, hypocritical woman, and I have no opinion of her."

"No more have I," said Mr. Bennet; "and I am glad to find that you do not depend on her serving you."

Mrs. Bennet deigned not to make any reply, but, unable to contain herself, began scolding one of her daughters.

"Don't keep coughing so, Kitty, for heaven's sake! Have a little compassion on my nerves. You tear them to pieces."

"Kitty has no discretion in her coughs," said her father; "she times them ill."

"I do not cough for my own amusement," replied Kitty fretfully. "When is your next ball to be, Lizzy?"

"To-morrow fortnight."

"Aye, so it is," cried her mother, "and Mrs. Long does not come back till the day before; so it will be impossible for her to introduce him, for she will not know him herself."

"Then, my dear, you may have the advantage of your friend, and introduce Mr. Bingley to HER."

"Impossible, Mr. Bennet, impossible, when I am not acquainted with him myself; how can you be so teasing?"

"I honour your circumspection. A fortnight's acquaintance is certainly very little. One cannot know what a man really is by the end of a fortnight. But if WE do not venture somebody else will; and after all, Mrs. Long and her daughters must stand their chance; and, therefore, as she will think it an act of kindness, if you decline the office, I will take it on myself."

The girls stared at their father. Mrs. Bennet said only, "Nonsense, nonsense!"

"What can be the meaning of that emphatic exclamation?" cried he. "Do you consider the forms of introduction, and the stress that is laid on them, as nonsense? I cannot quite agree with you there. What say you, Mary? For you are a young lady of deep reflection, I know, and read great books and make extracts."

Mary wished to say something sensible, but knew not how.

"While Mary is adjusting her ideas," he continued, "let us return to Mr. Bingley."

"I am sick of Mr. Bingley," cried his wife.

"I am sorry to hear that; but why did not you tell me that before? If I had known as much this morning I should certainly not have called on him. It is very unlucky; but as I have actually paid the visit, we cannot escape the acquaintance now."

The astonishment of the ladies was just what he could wish; that of Mrs. Bennet perhaps surpassing the rest; though, when the first tumult of joy was over, she began to declare that it was what she had expected all the while.`
      }
    ]
  },
  {
    id: "classic-tom-sawyer",
    type: "classic",
    title: "The Adventures of Tom Sawyer",
    author: "Mark Twain",
    year: 1876,
    genre: "Adventure & American Classic",
    rating: 4.85,
    coverColor: "linear-gradient(135deg, #3d2f21 0%, #1f170f 100%)",
    accentColor: "#574230",
    description: "Mark Twain's spirited tale of boyhood innocence, river town mischief, treasure hunts, and the enduring charm of growing up along the Mississippi River.",
    readTime: "22 min excerpt",
    tags: ["Adventure", "Humor", "Youth", "Mississippi"],
    chapters: [
      {
        id: "ts-ch1",
        title: "Chapter I: Y-o-u-u Tom!",
        subtitle: "Aunt Polly's Trial & Tom's Escape",
        content: `"TOM!"

No answer.

"TOM!"

No answer.

"What's gone with that boy, I wonder? You TOM!"

No answer.

The old lady pulled her spectacles down and looked over them about the room; then she put them up and looked out under them. She seldom or never looked THROUGH them for so small a thing as a boy; they were her state pair, the pride of her heart, and were built for "style," not service—she could have seen through a pair of stove-lids just as well. She looked perplexed for a moment, and then said, not fiercely, but still loud enough for the furniture to hear:

"Well, I lay if I get hold of you I'll—"

She did not finish, for by this time she was bending down and punching under the bed with the broom, and so she needed breath to punctuate the punches with. She resurrected nothing but the cat.

"I never did see the beat of that boy!"

She went to the open door and stood in it and looked out among the tomato vines and "jimpson" weeds that constituted the garden. No Tom. So she lifted up her voice at an angle calculated for distance and shouted:

"Y-o-u-u TOM!"

There was a slight noise behind her and she turned just in time to seize a small boy by the slack of his roundabout and arrest his flight.

"There! I might 'a' thought of that closet. What you been doing in there?"

"Nothing."

"Nothing! Look at your hands. And look at your mouth. What IS that truck?"

"I don't know, aunt."

"Well, I know. It's jam—that's what it is. Forty times I've said if you didn't let that jam alone I'd skin you. Hand me that switch."

The switch hovered in the air—the peril was desperate—

"My! Look behind you, aunt!"

The old lady whirled round, and snatched her skirts for safety. The lad fled on the instant, scrambled up the high board fence, and disappeared over it.

His aunt Polly stood surprised a moment, and then broke into a gentle laugh.

"Hang the boy, can't I never learn anything? Ain't he played me tricks enough like that for me to be looking out for him by this time? But old fools is the biggest fools there is. Can't learn an old dog new tricks, as the saying is. But my goodness, he never plays them alike, two days, and how is a body to know what's coming? He 'pears to know just how long he can torment me before I get my dander up, and he knows if he can make out to put me off for a minute or make me laugh, it's all down again and I can't hit him a lick."`
      },
      {
        id: "ts-ch2",
        title: "Chapter II: The Glorious Whitewasher",
        subtitle: "Turning Labor into Privilege",
        content: `Saturday morning was come, and all the summer world was bright and fresh, and brimming with life. There was a song in every heart; and if the heart was young the music came at the lips. There was cheer in every face and a spring in every step. The locust-trees were in bloom and the fragrance of the blossoms filled the air. Cardiff Hill, beyond the village and above it, was green with vegetation and it lay just far enough away to seem a Delectable Land, dreamy, reposeful, and inviting.

Tom appeared on the sidewalk with a bucket of whitewash and a long-handled brush. He surveyed the fence, and all gladness left him and a deep melancholy settled down upon his spirit. Thirty yards of board fence nine feet high. Life to him seemed hollow, and existence but a burden. Sighing, he dipped his brush and passed it along the topmost plank; repeated the operation; did it again; compared the insignificant whitewashed streak with the far-reaching continent of unwhitewashed fence, and sat down on a tree-box out of heart.

Jim came skipping out at the gate with a tin pail, singing Buffalo Gals. Bringing water from the town pump had always been hateful work in Tom's eyes, before, but now it did not strike him so. He remembered that there was company at the pump. White, mulatto, and negro boys and girls were always there waiting their turns, resting, trading playthings, quarreling, fighting, skylarking. And he remembered that although the pump was only a hundred and fifty yards off, Jim never got back with a bucket of water under an hour—and even then somebody generally had to go after him.

Tom said: "Say, Jim, I'll fetch the water if you'll whitewash some."

Jim shook his head and said: "Can't, Mars Tom. Ole missis, she tole me I got to go an' git dis water an' not stop foolin' roun' wid anybody. She say she spec' Mars Tom gwine to ax me to whitewash, an' so she tole me go 'long an' 'tend to my own business—she 'lowed SHE'D 'tend to de whitewashin'."

"Oh, never you mind what she said, Jim. That's the way she always talks. Gimme the bucket—I won't be gone only a minute. She won't ever know."

"Oh, I dasn't, Mars Tom. Ole missis she'd take an' tar de head off'n me. 'Deed she would."

"She! She never licks anybody—whacks 'em over the head with her thimble—and who cares for that, I'd like to know. She talks awful, but talk don't hurt—anyways it don't if she don't cry. Jim, I'll give you a marvel. I'll give you a white alley!"

Jim began to waver.`
      }
    ]
  }
];

const INITIAL_SUMMARIES = [
  {
    id: "summary-atomic-habits",
    type: "summary",
    title: "Atomic Habits",
    subtitle: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    author: "James Clear",
    year: 2018,
    genre: "Productivity & Psychology",
    rating: 4.9,
    readTime: "5 min read",
    coverColor: "linear-gradient(135deg, #1b3b2b 0%, #10231a 100%)",
    accentColor: "#2a5941",
    description: "Tiny changes lead to remarkable results. Discover a proven system to master small everyday habits that compound into extraordinary life-long achievements.",
    purchaseUrl: "https://jamesclear.com/atomic-habits",
    tags: ["Habits", "Growth", "Productivity", "Mindset"],
    summary: {
      intro: "In 'Atomic Habits', James Clear presents a practical framework grounded in biology, psychology, and neuroscience to reshape how you think about progress. Clear argues that monumental changes are not created by massive overnight breakthroughs, but rather by the quiet accumulation of hundreds of small, seemingly insignificant decisions called 'atomic habits'.",
      mainIdea: "You do not rise to the level of your goals; you fall to the level of your systems. True long-term change comes from identity shifts rather than solely outcome-driven desires.",
      coreConcepts: [
        {
          heading: "The 1% Compounding Rule",
          text: "Improving by just 1% each day makes you 37 times better by year's end. Conversely, declining by 1% daily degrades your skill set down to near zero. Habits are the compound interest of self-improvement."
        },
        {
          heading: "The 3 Layers of Behavior Change",
          text: "1. Outcome Change (what you get: weight loss, book written).\n2. Process Change (what you do: workout schedule, daily word count).\n3. Identity Change (what you believe: becoming a reader, becoming an athlete). The most sustainable habits stem from identity."
        },
        {
          heading: "The Habit Loop",
          text: "Every habit follows a four-step loop: Cue (trigger), Craving (desire), Response (action), and Reward (satisfaction)."
        }
      ],
      keyLessons: [
        "Make It Obvious: Design your environment so the cues for good habits are in plain sight (e.g., place your book directly on your pillow).",
        "Make It Attractive: Pair an action you need to do with an action you want to do (Temptation Bundling).",
        "Make It Easy: Reduce friction. Use the 2-Minute Rule: when starting a new habit, scale it down to under two minutes (e.g., 'Read one page').",
        "Make It Satisfying: What is immediately rewarded is repeated; what is immediately punished is avoided. Use habit trackers for visible positive feedback."
      ],
      practicalExamples: [
        "Habit Stacking: 'After I pour my morning coffee, I will meditate for one minute.'",
        "Inversion for Bad Habits: Make the cue invisible, the craving unattractive, the response difficult (e.g., put your smartphone in another room while working), and the reward unsatisfying."
      ],
      takeaways: [
        "Focus on systems rather than arbitrary goals.",
        "Your current habits are a vote for the type of person you wish to become.",
        "Small improvements done consistently outperform sporadic heroic efforts.",
        "Never miss twice: when life disrupts your streak, get back on track immediately."
      ]
    }
  },
  {
    id: "summary-subtle-art",
    type: "summary",
    title: "The Subtle Art of Not Giving a F*ck",
    subtitle: "A Counterintuitive Approach to Living a Good Life",
    author: "Mark Manson",
    year: 2016,
    genre: "Philosophy & Personal Growth",
    rating: 4.7,
    readTime: "5 min read",
    coverColor: "linear-gradient(135deg, #382c23 0%, #1f1813 100%)",
    accentColor: "#573f2f",
    description: "A refreshingly candid, no-nonsense manifesto on letting go of superficial positivity and choosing what truly matters in life.",
    purchaseUrl: "https://markmanson.net/books/subtle-art",
    tags: ["Philosophy", "Stoicism", "Mindset", "Reality"],
    summary: {
      intro: "Mark Manson cuts through decades of toxic positivity and feel-good self-help clichés. His central premise is sobering yet liberating: human beings have finite time and energy. Trying to care about everything leads to anxiety and superficiality. Instead, living a meaningful life requires discerning what is truly worth caring about and accepting discomfort as an unavoidable part of growth.",
      mainIdea: "Happiness is not the absence of problems; happiness comes from solving good problems. You cannot live a struggle-free life, so you must choose what struggles are worthy of your energy.",
      coreConcepts: [
        {
          heading: "The Feedback Loop from Hell",
          text: "Modern society pushes constant anxiety: feeling bad about feeling bad, feeling angry about feeling angry. Accepting negative emotions breaks the vicious loop and frees mental bandwidth."
        },
        {
          heading: "The Value of Negative Experiences",
          text: "The desire for a more positive experience is itself a negative experience; the acceptance of one's negative experience is itself a positive experience (Alan Watts' Backwards Law)."
        },
        {
          heading: "Good Values vs Bad Values",
          text: "Bad values are external, non-controllable, and superstitious (pleasure, material success, always being right). Good values are reality-based, socially constructive, and internally controllable (honesty, vulnerability, curiosity, responsibility)."
        }
      ],
      keyLessons: [
        "You Are Not Special: Accepting your ordinary nature frees you from the crippling pressure of needing to be an extraordinary genius at every moment.",
        "Take 100% Responsibility: You may not be at fault for what happens to you, but you are always responsible for how you respond to it.",
        "Embrace Failure: Improvement at anything is based on thousands of tiny failures. If you are unwilling to fail, you are unwilling to succeed.",
        "The 'Do Something' Principle: Action isn't just the effect of motivation; it is also the cause of it. When stuck, just do something minor, and momentum follows."
      ],
      practicalExamples: [
        "Choosing Your Struggles: Don't ask 'What do I want to enjoy?' Ask 'What pain am I willing to endure to achieve this?'",
        "Setting Boundaries: Say 'no' to social obligations, projects, and expectations that don't align with your deepest authentic values."
      ],
      takeaways: [
        "Stop trying to feel happy all the time; embrace life's struggles as opportunities for meaning.",
        "Choose internal, controllable values over external status metrics.",
        "Accept mortality (Memento Mori): remembering that life ends puts trivial anxieties into perspective.",
        "Reserve your caring energy for family, purpose, craft, and truth."
      ]
    }
  },
  {
    id: "summary-deep-work",
    type: "summary",
    title: "Deep Work",
    subtitle: "Rules for Focused Success in a Distracted World",
    author: "Cal Newport",
    year: 2016,
    genre: "Productivity & Career",
    rating: 4.85,
    readTime: "5 min read",
    coverColor: "linear-gradient(135deg, #1f2e3d 0%, #0f1821 100%)",
    accentColor: "#2d455d",
    description: "In an age of relentless digital interruptions, the ability to focus without distraction is becoming a rare and supremely valuable superpower.",
    purchaseUrl: "https://calnewport.com/books/deep-work/",
    tags: ["Deep Work", "Focus", "Career", "Strategy"],
    summary: {
      intro: "Cal Newport, computer science professor at Georgetown University, defines 'Deep Work' as professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit. Deep work creates new value, improves your skill, and is hard to replicate. In contrast, 'Shallow Work' consists of logistical, non-cognitively demanding tasks often performed while distracted.",
      mainIdea: "The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy. The few who cultivate this skill will thrive.",
      coreConcepts: [
        {
          heading: "The Deep Work Hypothesis",
          text: "High-Value Work Produced = (Time Spent) x (Intensity of Focus). Splitting focus across emails and tasks incurs an 'attention residue' that drastically reduces cognitive output."
        },
        {
          heading: "The 4 Deep Work Philosophies",
          text: "1. Monastic (eliminate all shallow distractions completely).\n2. Bimodal (dedicate specific days or months to deep isolation).\n3. Rhythmic (daily habitual scheduled blocks, e.g., 8 AM–11 AM).\n4. Journalistic (fit deep work into open slots when possible)."
        },
        {
          heading: "Attention Residue",
          text: "When you switch from Task A to Task B, your attention does not switch immediately; a residue remains stuck thinking about the previous task."
        }
      ],
      keyLessons: [
        "Schedule Every Minute of Your Day: Time-block your calendar to give focus deliberate intent rather than letting whim dictate your morning.",
        "Embrace Boredom: If every moment of boredom is treated with a smartphone check, your brain's ability to tolerate deep focus atrophies.",
        "Quit Low-Impact Social Media: Apply the Craftsman Approach to tool selection: only use a network if its positive impacts substantially outweigh its negatives.",
        "Drain the Shallows: Systematically prune trivial meetings, reduce email volume, and set clear communication filters."
      ],
      practicalExamples: [
        "Roosevelt Dashes: Pick a high-priority task and set a timer with an aggressive deadline. Work with frantic, unbroken focus to beat the clock.",
        "Fixed-Schedule Productivity: Determine a firm shutdown time (e.g., 5:30 PM) and work backward to ensure deep obligations are fulfilled beforehand."
      ],
      takeaways: [
        "Deep work is a muscle: train it daily with distraction-free blocks.",
        "Multitasking is a myth; attention residue severely hampers cognitive acuity.",
        "Protect your cognitive energy as your most precious career asset.",
        "Ritualize the start and shutdown of your working day for mental restoration."
      ]
    }
  }
];

const INITIAL_STORIES = [
  {
    id: "story-seed-1",
    type: "community",
    title: "The Clockmaker of Montmartre",
    author: "Elena Rostova",
    genre: "Historical Fiction",
    chapterTitle: "Chapter 1: The Pendulum's Whisper",
    wordCount: 420,
    readTime: "3 min read",
    createdAt: "2026-11-08T14:30:00Z",
    isUserStory: false,
    content: `Monsieur Laurent possessed hands that remembered things his mind had long since surrendered to the fog of eighty winters. Every morning at precisely six, while the cobbles of Rue Gabrielle still held the mist off the Seine, he would unlock the brass latch of his basement workshop. 

The room smelled of clove oil, whale-grease, and iron shavings. On the velvet-lined mahogany table sat an astronomical clock crafted in 1782 by an apprentice whose name had been lost to the Revolution. Its pendulum swung not with the sharp, nervous tick of modern pocket-watches, but with a low, oceanic heave.

"Listen to that, little sparrow," he whispered to the finch in the wicker cage beside the window. "A second is never empty. It is merely quiet."

A shadow crossed the frosted glass. Someone was tapping at the frosted pane—three light raps, followed by the pause of someone hesitant to intrude. It was a girl in a drenched wool mantle, carrying a wrapped leather box no larger than a loaf of bread.

"Monsieur Laurent?" her voice trembled through the door. "My grandfather told me that if the spring ever uncoiled backwards, only you would know what to do."

Laurent looked at his trembling fingers. Then he smiled, adjusting his brass loupe.`
  },
  {
    id: "story-seed-2",
    type: "community",
    title: "Signal in the Silent Nebula",
    author: "Marcus Thorne",
    genre: "Science Fiction",
    chapterTitle: "Chapter 1: The Echo from Sector 12",
    wordCount: 380,
    readTime: "3 min read",
    createdAt: "2026-11-09T09:15:00Z",
    isUserStory: false,
    content: `The observatory on Ganymede was the loneliest posting in the solar confederacy. For sixteen months, Dr. Kenneth Vance had listened to nothing but cosmic background radiation—the steady, gravelly hiss of stars dying five billion years ago.

Until 03:42 universal time.

The visual spectrogram spiked. It was not a random pulse. It followed the Fibonacci sequence, repeated four times, followed by a phonetic fragment that matched ancient Sumerian syllables for 'horizon'.

Vance dropped his thermos. The dark tea pooled across the thermal keyboard, but his eyes never moved from the auxiliary monitor.

"System," he breathed into his collar mic. "Verify source coordinates."

"Coordinates verified," the synthetic voice replied calmly. "Origin point: Barnard's Star, distance 5.96 light years. Signal transmission date: approximately six years ago."

"System... who registered that vector as uninhabited?"

A pause of two seconds. In space, two seconds feels like a geological epoch.

"Correction, Doctor. That vector was never marked uninhabited. The survey team merely failed to return."`
  }
];

const INITIAL_CHAT_MESSAGES = [
  {
    id: "msg-1",
    author: "Elena Rostova",
    avatar: "ER",
    text: "Welcome to the Writers Lounge! What is everyone working on this week?",
    timestamp: "10:15 AM",
    isUser: false
  },
  {
    id: "msg-2",
    author: "Marcus Thorne",
    avatar: "MT",
    text: "Just finished chapter two of my sci-fi novella. Trying to ensure the scientific worldbuilding doesn't drown the character arcs!",
    timestamp: "10:22 AM",
    isUser: false
  },
  {
    id: "msg-3",
    author: "Clara Higgins",
    avatar: "CH",
    text: "Love that premise, Marcus! I'm editing an essay on Victorian literature and Jane Austen's conversational wit. The prose holds up wonderfully.",
    timestamp: "10:30 AM",
    isUser: false
  }
];


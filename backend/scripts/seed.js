require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../src/config/db");
const Article = require("../src/models/Article");

// picsum.photos serves real, optimizable JPEGs at an exact requested
// size (no oversized image waste — a common Lighthouse flag).
function coverImage(seed) {
  return `https://picsum.photos/seed/${seed}/800/450`;
}

const articles = [
  {
    title: "Why Most To-Do Lists Fail (And What Actually Works)",
    slug: "why-todo-lists-fail",
    excerpt:
      "A to-do list without a system behind it is just anxiety with bullet points. Here's what changes when you add one.",
    coverImageUrl: coverImage("todo-list"),
    coverImageAlt: "A handwritten to-do list on paper with several items checked off",
    tags: ["productivity", "habits"],
    readingMinutes: 5,
    content: `Most to-do lists collapse under their own weight by Wednesday. Not because the person writing them is disorganized, but because a flat list treats a 2-minute email and a 3-day project as the same kind of item.

The fix isn't a better app. It's separating *capture* from *commitment*. Write everything down the moment it occurs to you — that's capture. Then, once a day, decide what actually gets a slot on today's list — that's commitment. Everything else waits.

This one separation is why time-blocking and "eat the frog" techniques work for some people and not others: they only work once you've already filtered the list down to what's realistic for the day.`,
  },
  {
    title: "The Case for Boring Technology",
    slug: "case-for-boring-technology",
    excerpt:
      "Every new framework promises to save you time. Most of that time gets spent learning the framework.",
    coverImageUrl: coverImage("boring-tech"),
    coverImageAlt: "Rows of server racks in a dimly lit data center",
    tags: ["engineering", "opinion"],
    readingMinutes: 6,
    content: `There's a particular kind of confidence that comes from picking the newest tool in a stack. It feels like progress. Often it's just risk, wearing progress as a costume.

"Boring" technology — the database that's been stable for a decade, the framework with a decade of Stack Overflow answers — has already had its edge cases found by someone else. You're not the first person to hit that bug. That's the whole appeal.

None of this means never adopt anything new. It means the bar for a new dependency should be "this solves a real, current pain," not "this looks impressive in a demo."`,
  },
  {
    title: "A Short Guide to Reading Error Messages",
    slug: "reading-error-messages",
    excerpt:
      "The error message is usually telling you exactly what's wrong. Most debugging time is spent not reading it carefully.",
    coverImageUrl: coverImage("error-messages"),
    coverImageAlt: "A laptop screen displaying lines of code with a red error highlighted",
    tags: ["engineering", "beginners"],
    readingMinutes: 4,
    content: `The instinct when an error appears is to scroll past it looking for the "real" problem. Usually the real problem is in the first line.

Read it top to bottom, once, slowly. Note the exact file and line number. Note the exact type of error — "undefined is not a function" and "network request failed" point in completely different directions, and conflating them wastes the next twenty minutes.

Then, and only then, search for it. Searching before reading means you're pattern-matching against someone else's bug instead of understanding your own.`,
  },
  {
    title: "What Coffee Shops Get Right About Focus",
    slug: "coffee-shops-and-focus",
    excerpt:
      "It's not the coffee. It's the specific kind of background noise that a silent room can't replicate.",
    coverImageUrl: coverImage("coffee-shop"),
    coverImageAlt: "A cup of coffee on a wooden table inside a busy café",
    tags: ["focus", "environment"],
    readingMinutes: 4,
    content: `Total silence and total chaos are both bad for concentration — one gives your mind nothing to filter out, so it starts hunting for something to notice; the other gives it too much.

Café noise sits in a middle band: present enough to occupy the part of your brain that would otherwise wander, patterned enough to fade into the background within a few minutes. It's the same reason white noise machines work for some people.

You don't need an actual café. A recording gets you most of the way there — the effect is about the *texture* of the sound, not the coffee.`,
  },
  {
    title: "The Myth of the Perfect First Draft",
    slug: "myth-of-the-perfect-first-draft",
    excerpt: "Waiting until you know exactly what to write is the single biggest reason nothing gets written.",
    coverImageUrl: coverImage("writing-draft"),
    coverImageAlt: "A notebook with crossed-out handwritten paragraphs and a pen resting on top",
    tags: ["writing", "habits"],
    readingMinutes: 5,
    content: `A first draft's only job is to exist. Not to be good, not to be close to final — just to give you something to react to, correct, and improve.

This is easy to say and hard to feel, because a bad paragraph on the screen is uncomfortable in a way that a well-formed idea in your head never is. But the idea in your head isn't real yet. It hasn't been tested against actual sentences, actual structure, actual reader confusion.

Every writer who seems to produce clean first drafts is either lying, editing as they go without noticing, or has simply written so many drafts that the bad version now takes less time to produce.`,
  },
  {
    title: "Small Rooms, Big Ideas: Why Constraints Help Creativity",
    slug: "constraints-help-creativity",
    excerpt: "An empty canvas is intimidating. A canvas with three rules is a game.",
    coverImageUrl: coverImage("constraints"),
    coverImageAlt: "An artist's desk with a small canvas, paintbrushes, and a limited set of paint colors",
    tags: ["creativity", "opinion"],
    readingMinutes: 4,
    content: `"Write anything" produces less than "write a story in exactly six words." The unlimited version has too many directions and none of them feel obligatory. The constrained version has exactly one shape to fill, and filling shapes is something the brain is good at.

This is why game jams produce more finished games per participant than open-ended personal projects, why sonnets outlived free verse's promise to make poetry easier, and why a strict budget often produces a more distinctive room than an unlimited one.

Constraints don't limit creativity. They give it a direction to push against.`,
  },
];

async function seed() {
  try {
    await connectDB();
    await Article.deleteMany({});
    await Article.insertMany(articles);
    console.log(`Seeded ${articles.length} articles.`);
  } catch (err) {
    console.error("Seed failed:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();

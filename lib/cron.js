import cron from "node-cron";
import Entry from "@/models/entry";
import Notification from "@/models/notification";
import connectDB from "@/lib/database";

const checkExpiredEntries = async () => {
  await connectDB();

  const now = new Date();

  const expiredEntries = await Entry.find({
    $expr: {
      $lte: [
        {
          $add: [
            "$createdAt",
            { $multiply: ["$periodInMonths", 30 * 24 * 60 * 60 * 1000] },
          ],
        },
        now,
      ],
    },
  });

  const notifications = expiredEntries.map((entry) => ({
    correspEntry: entry._id,
    message: `Your custody period for ${entry.storedTires} has expired.`,
  }));

  if (notifications.length > 0) {
    await Notification.insertMany(notifications);
    notifications.forEach((notification) => {
      console.log(
        `Notification created for entry ID: ${notification.correspEntry}`
      );
    });
  } else {
    console.log("No expired entries found.");
  }
};

// Schedule the cron job to run every minute for testing purposes
cron.schedule("* * * * *", checkExpiredEntries);

// For manual testing, immediately call the function

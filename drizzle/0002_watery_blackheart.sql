ALTER TABLE `courses` MODIFY COLUMN `priceUsd` int;--> statement-breakpoint
ALTER TABLE `courses` ADD `paymentType` enum('onetime','subscription') NOT NULL;--> statement-breakpoint
ALTER TABLE `courses` ADD `subscriptionPriceMonthly` int;--> statement-breakpoint
ALTER TABLE `courses` ADD `subscriptionPriceYearly` int;--> statement-breakpoint
ALTER TABLE `courses` ADD `stripeProductId` varchar(255);--> statement-breakpoint
ALTER TABLE `courses` ADD `stripePriceIdOnetime` varchar(255);--> statement-breakpoint
ALTER TABLE `courses` ADD `stripePriceIdMonthly` varchar(255);--> statement-breakpoint
ALTER TABLE `courses` ADD `stripePriceIdYearly` varchar(255);--> statement-breakpoint
ALTER TABLE `enrollments` ADD `stripePaymentIntentId` varchar(255);--> statement-breakpoint
ALTER TABLE `enrollments` ADD `stripeSubscriptionId` varchar(255);--> statement-breakpoint
ALTER TABLE `enrollments` ADD `isActive` int DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `payments` ADD `stripeInvoiceId` varchar(255);--> statement-breakpoint
ALTER TABLE `payments` ADD `paymentType` enum('onetime','subscription') NOT NULL;--> statement-breakpoint
ALTER TABLE `enrollments` DROP COLUMN `paymentId`;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Address'
      AND column_name = 'updateAt'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Address'
      AND column_name = 'updatedAt'
  ) THEN
    ALTER TABLE "Address" RENAME COLUMN "updateAt" TO "updatedAt";
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Order'
      AND column_name = 'updateAt'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Order'
      AND column_name = 'updatedAt'
  ) THEN
    ALTER TABLE "Order" RENAME COLUMN "updateAt" TO "updatedAt";
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'OrderItems'
      AND column_name = 'updateAt'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'OrderItems'
      AND column_name = 'updatedAt'
  ) THEN
    ALTER TABLE "OrderItems" RENAME COLUMN "updateAt" TO "updatedAt";
  END IF;
END $$;

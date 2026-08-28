import { Checkbox } from "./UI/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./UI/field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./UI/accordion";
import Search from "./Searchbar";
import { Skeleton } from "./UI/skeleton";
import { Slider } from "./UI/slider";

const SidebarShopAccordion = function ({
  brands,
  colour,
  categories,
  size,
  isLoading,
  priceRange,
  onPriceRange,
  minPrice,
  maxPrice,
}) {
  return (
    <Accordion /* defaultValue={["Brands"]} */ className="px-3 ">
      <AccordionItem value="Brands">
        {isLoading ? (
          <Skeleton className={`w-24 h-10 bg-red-500`} />
        ) : (
          <AccordionTrigger className="text-lg">Brands</AccordionTrigger>
        )}
        <AccordionContent className="text-(--color-text-secondary)">
          <Search
            searchIconHover="hover:scale-[1.01] transition-transform duration-200 "
            placeholder="Search brands..."
            className={`w-full p-1 bg-(--color-input-background) border-(color-input-border) border text-(--color-input-text) placeholder:text-(--color-input-placeholder) focus:ring-0 focus:outline-none rounded-sm `}
          />
          <FieldSet className="">
            <FieldGroup className="gap-3 ">
              <FieldDescription className="pt-4 text-(--color-text-muted) ">
                Select Brand
              </FieldDescription>

              {isLoading
                ? `Loading...`
                : brands.map((a) => (
                    <>
                      <Field
                        orientation="horizontal"
                        className="relative bottom-3"
                        key={a}
                      >
                        <Checkbox
                          id="brands"
                          name="brands" /* defaultChecked */
                        />
                        <FieldLabel
                          htmlFor="brands"
                          className={`text-(--color-text-secondary)`}
                        >
                          {a}
                        </FieldLabel>
                      </Field>
                    </>
                  ))}
            </FieldGroup>
          </FieldSet>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="Categories" className={``}>
        <AccordionTrigger className="text-lg">Categories</AccordionTrigger>
        <AccordionContent className="text-(--color-text-secondary)">
          <Search
            searchIconHover="hover:scale-[1.01] transition-transform duration-200 "
            placeholder="Search brands..."
            className={`w-full p-1 bg-(--color-input-background) border-(color-input-border) border text-(--color-input-text) placeholder:text-(--color-input-placeholder) focus:ring-0 focus:outline-none rounded-sm `}
          />
          <FieldSet className="">
            <FieldGroup className="gap-3 ">
              <FieldDescription className="pt-4 text-(--color-text-muted) ">
                Select Category
              </FieldDescription>
              {categories.map((a) => (
                <>
                  <Field
                    orientation="horizontal"
                    className="relative bottom-3"
                    key={a}
                  >
                    <Checkbox
                      id="categories"
                      name="categories" /* defaultChecked */
                    />
                    <FieldLabel
                      htmlFor="categories"
                      className={`text-(--color-text-secondary)`}
                    >
                      {a}
                    </FieldLabel>
                  </Field>
                </>
              ))}
            </FieldGroup>
          </FieldSet>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="Colour" className={``}>
        <AccordionTrigger className="text-lg">Colour</AccordionTrigger>
        <AccordionContent className="text-(--color-text-secondary)">
          <Search
            searchIconHover="hover:scale-[1.01] transition-transform duration-200 "
            placeholder="Search brands..."
            className={`w-full p-1 bg-(--color-input-background) border-(color-input-border) border text-(--color-input-text) placeholder:text-(--color-input-placeholder) focus:ring-0 focus:outline-none rounded-sm `}
          />
          <FieldSet className="">
            <FieldGroup className="gap-3 ">
              <FieldDescription className="pt-4 text-(--color-text-muted) ">
                Select Colour
              </FieldDescription>
              {colour.map((a) => (
                <>
                  <Field
                    orientation="horizontal"
                    className="relative bottom-3"
                    key={a}
                  >
                    <Checkbox id="colour" name="colour" /* defaultChecked */ />
                    <FieldLabel
                      htmlFor="colour"
                      className={`text-(--color-text-secondary)`}
                    >
                      {a}
                    </FieldLabel>
                  </Field>
                </>
              ))}
            </FieldGroup>
          </FieldSet>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="Size" className={``}>
        <AccordionTrigger className="text-lg">Size</AccordionTrigger>
        <AccordionContent className="text-(--color-text-secondary)">
          <Search
            searchIconHover="hover:scale-[1.01] transition-transform duration-200 "
            placeholder="Search brands..."
            className={`w-full p-1 bg-(--color-input-background) border-(color-input-border) border text-(--color-input-text) placeholder:text-(--color-input-placeholder) focus:ring-0 focus:outline-none rounded-sm `}
          />
          <FieldSet className="">
            <FieldGroup className="gap-3 ">
              <FieldDescription className="pt-4 text-(--color-text-muted) ">
                Select Size
              </FieldDescription>
              {size.map((a) => (
                <>
                  <Field
                    orientation="horizontal"
                    className="relative bottom-3"
                    key={a}
                  >
                    <Checkbox id="size" name="size" /* defaultChecked */ />
                    <FieldLabel
                      htmlFor="size"
                      className={`text-(--color-text-secondary)`}
                    >
                      {a}
                    </FieldLabel>
                  </Field>
                </>
              ))}
            </FieldGroup>
          </FieldSet>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="Price" className={``}>
        <AccordionTrigger className="text-lg">Price</AccordionTrigger>
        <AccordionContent className="text-(--color-text-secondary)">
          <FieldSet className="">
            <FieldGroup className="gap-3 ">
              <FieldDescription
                className=" 
              text-(--color-text-muted) "
              >
                Select Price
              </FieldDescription>
              <div className="flex items-center justify-between -mt-1.25">
                <p>Min: R {priceRange.at(0)}</p>
                <p>Max: R {priceRange.at(1)}</p>
              </div>
              <Slider
                value={priceRange}
                min={minPrice}
                step={100}
                max={maxPrice}
                onValueChange={onPriceRange}
              />
            </FieldGroup>
          </FieldSet>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default SidebarShopAccordion;

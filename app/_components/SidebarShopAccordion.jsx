"use client";
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
import { RadioGroup, RadioGroupItem } from "./UI/radio-group";
import { Label } from "./UI/label";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  availability,
}) {
  const search = useSearchParams();
  const [accordionValue, setAccordionValue] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(() =>
    search.getAll(`brand`),
  );
  const [selectedCategory, setSelectedCategory] = useState(() =>
    search.getAll(`category`),
  );

  const router = useRouter();

  const sale = ["All", "On sale", "Not on sale"];
  useEffect(() => {
    if (accordionValue.length > 0) {
      document.documentElement.style.overflow = `hidden`;
    }
    if (accordionValue === 0) {
      document.documentElement.style.overflow = "";
    }

    const params = new URLSearchParams();

    selectedBrand.forEach((a) => params.append(`brand`, a));
    selectedCategory.forEach((a) => params.append(`category`, a));

    router.push(`/shop?${params.toString()}`);

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [accordionValue, router, selectedBrand, selectedCategory]);

  console.log(selectedCategory);

  return (
    <Accordion
      /* defaultValue={["Brands"]} */ value={accordionValue}
      onValueChange={setAccordionValue}
      className="px-3"
    >
      <AccordionItem value="Brands">
        {isLoading ? (
          <Skeleton className={`w-24 h-10`} />
        ) : (
          <AccordionTrigger className="text-lg">Brands</AccordionTrigger>
        )}
        <AccordionContent className="text-(--color-text-secondary)">
          <Search
            placeholder="Search brands..."
            className={`w-full p-1 bg-(--color-input-background) border-(color-input-border) border text-(--color-input-text) placeholder:text-(--color-input-placeholder) focus:ring-0 focus:outline-none rounded-sm `}
          />
          <FieldSet className="">
            <FieldGroup className="gap-3 ">
              <FieldDescription className="pt-4 text-(--color-text-muted) ">
                Select Brand
              </FieldDescription>

              <div
                className={`max-h-[25vh]  custom-scrollbar  overflow-y-auto pt-2 `}
              >
                {isLoading
                  ? `Loading...`
                  : brands.map((a) => (
                      <>
                        <Field
                          orientation="horizontal"
                          className="py-1"
                          key={a}
                        >
                          <Checkbox
                            checked={selectedBrand.includes(a)}
                            value={a}
                            onCheckedChange={(checked) =>
                              checked
                                ? setSelectedBrand((sneakerBrand) => [
                                    ...sneakerBrand,
                                    a,
                                  ])
                                : setSelectedBrand((sneakerBrand) =>
                                    sneakerBrand.filter((brand) => brand !== a),
                                  )
                            }
                            id={`brand-${a}`}
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
              </div>
            </FieldGroup>
          </FieldSet>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="Categories" className={``}>
        <AccordionTrigger className="text-lg">Categories</AccordionTrigger>
        <AccordionContent className="text-(--color-text-secondary)">
          <Search
            placeholder="Search brands..."
            className={`w-full p-1 bg-(--color-input-background) border-(color-input-border) border text-(--color-input-text) placeholder:text-(--color-input-placeholder) focus:ring-0 focus:outline-none rounded-sm `}
          />
          <FieldSet className="">
            <FieldGroup className="gap-3 ">
              <FieldDescription className="pt-4 text-(--color-text-muted) ">
                Select Category
              </FieldDescription>
              <div
                className={`max-h-[25vh]  custom-scrollbar  overflow-y-auto pt-2 `}
              >
                {categories.map((a) => (
                  <>
                    <Field orientation="horizontal" className="py-1" key={a}>
                      <Checkbox
                        id="categories"
                        name="categories" /* defaultChecked */
                        value={a}
                        checked={selectedCategory.includes(a)}
                        onCheckedChange={(checked) => {
                          checked
                            ? setSelectedCategory((sneakerCategory) => [
                                ...sneakerCategory,
                                a,
                              ])
                            : setSelectedCategory((category) =>
                                category.filter((z) => z !== a),
                              );
                        }}
                      />
                      <FieldLabel
                        htmlFor={`categories-${a}`}
                        className={`text-(--color-text-secondary)`}
                      >
                        {a}
                      </FieldLabel>
                    </Field>
                  </>
                ))}
              </div>
            </FieldGroup>
          </FieldSet>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="Colour" className={``}>
        <AccordionTrigger className="text-lg">Colour</AccordionTrigger>
        <AccordionContent className="text-(--color-text-secondary)">
          <Search
            placeholder="Search brands..."
            className={`w-full p-1 bg-(--color-input-background) border-(color-input-border) border text-(--color-input-text) placeholder:text-(--color-input-placeholder) focus:ring-0 focus:outline-none rounded-sm `}
          />
          <FieldSet className="">
            <FieldGroup className="gap-3">
              <FieldDescription className="pt-4 text-(--color-text-muted) ">
                Select Colour
              </FieldDescription>
              <div
                className={`max-h-[25vh]  custom-scrollbar  overflow-y-auto  pt-2 `}
              >
                {colour.map((a) => (
                  <>
                    <Field orientation="horizontal" className="py-1" key={a}>
                      <Checkbox
                        id="colour"
                        name="colour" /* defaultChecked */
                      />
                      <FieldLabel
                        htmlFor="colour"
                        className={`text-(--color-text-secondary)`}
                      >
                        {a}
                      </FieldLabel>
                    </Field>
                  </>
                ))}
              </div>
            </FieldGroup>
          </FieldSet>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="Size" className={``}>
        <AccordionTrigger className="text-lg">Size</AccordionTrigger>
        <AccordionContent className="text-(--color-text-secondary)">
          <Search
            placeholder="Search brands..."
            className={`w-full p-1 bg-(--color-input-background) border-(color-input-border) border text-(--color-input-text) placeholder:text-(--color-input-placeholder) focus:ring-0 focus:outline-none rounded-sm `}
          />
          <FieldSet className="">
            <FieldGroup className="gap-3 ">
              <FieldDescription className="pt-4 text-(--color-text-muted) ">
                Select Size
              </FieldDescription>
              <div
                className={`max-h-[25vh]  custom-scrollbar  overflow-y-auto  pt-2 `}
              >
                {size.map((a) => (
                  <>
                    <Field orientation="horizontal" className="py-1" key={a}>
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
              </div>
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

      <AccordionItem value="Availability" className={``}>
        <AccordionTrigger className="text-lg">Availability</AccordionTrigger>
        <AccordionContent className="text-(--color-text-secondary)">
          <FieldSet className="">
            <FieldGroup className="gap-3 ">
              <FieldDescription
                className=" 
              text-(--color-text-muted) "
              >
                Select Availability
              </FieldDescription>
              {availability.map((a) => (
                <>
                  <Field
                    orientation="horizontal"
                    className="relative bottom-3"
                    key={a}
                  >
                    <Checkbox
                      id="availability"
                      name="availability" /* defaultChecked */
                    />
                    <FieldLabel
                      htmlFor="availability"
                      className={`text-(--color-text-secondary)`}
                    >
                      {a}
                    </FieldLabel>
                  </Field>
                </>
              ))}

              <FieldDescription
                className=" 
              text-(--color-text-muted) "
              >
                Select Sale
              </FieldDescription>

              <RadioGroup>
                {sale.map((a) => (
                  <Field
                    orientation="horizontal"
                    className="relative bottom-3"
                    key={a}
                  >
                    <RadioGroupItem value={a} id={`sale-${a}`} />

                    <Label htmlFor={`sale-${a}`}>{a}</Label>
                  </Field>
                ))}
              </RadioGroup>
            </FieldGroup>
          </FieldSet>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default SidebarShopAccordion;

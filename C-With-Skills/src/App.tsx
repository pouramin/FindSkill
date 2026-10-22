import { useEffect, useRef, useState } from "react";
import type { ReactNode, SyntheticEvent } from "react";
import { categories, money, products, readCart, sizes } from "./catalog";
import type { CartItem, Category, Product } from "./catalog";

function Icon({
  name,
  size = 20,
}: {
  name:
    | "arrow"
    | "bag"
    | "search"
    | "close"
    | "menu"
    | "plus"
    | "minus"
    | "heart"
    | "check"
    | "box"
    | "return"
    | "spark";
  size?: number;
}) {
  const paths = {
    arrow: "M4 12h15m-6-6 6 6-6 6",
    bag: "M5 7h14l1 14H4L5 7Zm3 0V5a4 4 0 0 1 8 0v2",
    search: "m16 16 5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
    close: "m6 6 12 12M6 18 18 6",
    menu: "M3 6h18M3 12h18M3 18h18",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    heart:
      "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
    check: "m5 12 4 4L19 6",
    box: "m3 7 9-4 9 4v11l-9 4-9-4V7Zm0 0 9 4 9-4M12 11v11M7 5l10 4",
    return: "M4 4v6h6M4 10a8 8 0 1 1 1 9",
    spark: "m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

function ProductImage({
  product,
  className = "",
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      className={className}
      src={`/images/${product.image}.jpg`}
      alt={`${product.name} in ${product.color}`}
      width="1100"
      height="880"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      onError={fallback}
    />
  );
}
function fallback(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = "/images/fallback.svg";
}

function Modal({
  title,
  children,
  close,
  className = "",
}: {
  title: string;
  children: ReactNode;
  close: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        closeRef.current();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const rect = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
          )
            closeRef.current();
        }
      }}
    >
      <button
        className="icon-button modal-close"
        aria-label={`Close ${title}`}
        onClick={close}
      >
        <Icon name="close" />
      </button>
      {children}
    </dialog>
  );
}

function ProductDetail({
  product,
  add,
}: {
  product: Product;
  add: (product: Product, size: number) => void;
}) {
  const [size, setSize] = useState<number | null>(null);
  const [error, setError] = useState("");
  const sizeRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="detail-grid">
      <div className="detail-image">
        <ProductImage product={product} priority />
        <span className="image-label">Considered in every detail.</span>
      </div>
      <div className="detail-content">
        <span className="small-label">{product.category} collection</span>
        <h2>{product.name}</h2>
        <div className="detail-price">
          {money(product.price)} <span>Tax included</span>
        </div>
        <p className="description">{product.description}</p>
        <div className="detail-color">
          <span
            className="color-dot"
            style={{ background: product.tones[0] }}
          />
          {product.color}
        </div>
        <fieldset
          className="size-select"
          aria-describedby={error ? "size-error" : undefined}
        >
          <legend>
            Select your size <span>EU sizing</span>
          </legend>
          <div className="sizes">
            {sizes.map((s, i) => (
              <button
                ref={i === 0 ? sizeRef : undefined}
                key={s}
                aria-pressed={size === s}
                className={size === s ? "selected" : ""}
                onClick={() => {
                  setSize(s);
                  setError("");
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="validation" id="size-error" role="status">
          {error ||
            (size
              ? `EU ${size} selected. You're good to go.`
              : "True to size. Between sizes? Go one size up.")}
        </div>
        <button
          className="button dark full"
          onClick={() => {
            if (size === null) {
              setError("Choose your shoe size before adding to your bag.");
              sizeRef.current?.focus();
              return;
            }
            add(product, size);
          }}
        >
          Add to bag <Icon name="bag" size={19} />
        </button>
        <details className="detail-disclosure">
          <summary>Fit & size guide</summary>
          <p>
            Unisex EU sizing. Measure your foot from heel to longest toe. EU 36:
            23 cm, 37: 23.5 cm, 38: 24 cm, 39: 24.5 cm, 40: 25 cm, 41: 26 cm,
            42: 26.5 cm, 43: 27.5 cm, 44: 28 cm, 45: 29 cm, 46: 29.5 cm.
          </p>
        </details>
        <details className="detail-disclosure">
          <summary>Materials & care</summary>
          <p>
            Mixed textile and synthetic upper with a rubber outsole. Wipe clean
            with a damp cloth. Air dry away from direct heat. Do not machine
            wash.
          </p>
        </details>
        <div className="detail-perks">
          <span>
            <Icon name="box" size={17} /> Free shipping over €150
          </span>
          <span>
            <Icon name="return" size={17} /> 30-day returns
          </span>
        </div>
      </div>
    </div>
  );
}

function getRoute() {
  const params = new URLSearchParams(location.search);
  return {
    category: categories.includes(params.get("category") as Category)
      ? (params.get("category") as Category)
      : ("All sneakers" as Category),
    product: params.get("product"),
  };
}
const information: Record<string, { title: string; body: string }> = {
  shipping: {
    title: "Shipping & returns",
    body: "Our concept policy: complimentary standard shipping on orders over €150, otherwise €8. Delivery takes 3–5 business days within the EU. Unworn sneakers in their original packaging can be returned within 30 days. AERON is a fictional storefront; no orders or shipments are processed.",
  },
  contact: {
    title: "A little help?",
    body: "Explore the fit guide on every product page, or read our shipping and returns policy. This AERON concept store has no customer support team and does not accept orders. Product photography is illustrative and may show other brands.",
  },
  privacy: {
    title: "Your privacy, simply",
    body: "This website stores your shopping bag and newsletter preference locally in your browser. Your email is not sent to a server, and we do not send marketing messages. No advertising or analytics trackers are used. Clear your browser’s site data to remove saved preferences.",
  },
};

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [cart, setCart] = useState<CartItem[]>(readCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [saved, setSaved] = useState<string[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [notice, setNotice] = useState("");
  const [info, setInfo] = useState<string | null>(null);
  const [newsletter, setNewsletter] = useState("");
  const [lastRemoved, setLastRemoved] = useState<CartItem | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const pop = () => setRoute(getRoute());
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("aeron:cart:v1", JSON.stringify(cart));
    } catch {
      /* The bag remains usable when storage is unavailable. */
    }
  }, [cart]);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 4500);
    return () => window.clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);
  function navigate(values: { category?: Category; product?: string | null }) {
    const params = new URLSearchParams(location.search);
    if (values.category !== undefined) {
      if (values.category === "All sneakers") params.delete("category");
      else params.set("category", values.category);
    }
    if ("product" in values) {
      if (values.product) params.set("product", values.product);
      else params.delete("product");
    }
    const query = params.toString();
    history.pushState(
      null,
      "",
      `${location.pathname}${query ? `?${query}` : ""}${location.hash}`,
    );
    setRoute(getRoute());
  }
  const activeProduct = products.find((p) => p.id === route.product);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + products.find((p) => p.id === item.id)!.price * item.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= 150 ? 0 : 8;
  const visibleProducts = products
    .filter(
      (p) =>
        (route.category === "All sneakers" || p.category === route.category) &&
        (!savedOnly || saved.includes(p.id)) &&
        `${p.name} ${p.color} ${p.category}`
          .toLowerCase()
          .includes(search.toLowerCase().trim()),
    )
    .sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : 0,
    );
  function add(product: Product, size: number) {
    if (!sizes.includes(size)) return;
    const existing = cart.find(
      (item) => item.id === product.id && item.size === size,
    );
    if (existing && existing.quantity >= 10) {
      setNotice("Your bag already has the maximum of 10 pairs in this size.");
      return;
    }
    setCart((current) => {
      const match = current.find(
        (item) => item.id === product.id && item.size === size,
      );
      return match
        ? current.map((item) =>
            item === match
              ? { ...item, quantity: Math.min(10, item.quantity + 1) }
              : item,
          )
        : [...current, { id: product.id, size, quantity: 1 }];
    });
    navigate({ product: null });
    setCartOpen(true);
    setNotice(`${product.name}, EU ${size}, added to your bag.`);
  }
  function changeQuantity(item: CartItem, delta: number) {
    setCart((current) =>
      current.map((i) =>
        i.id === item.id && i.size === item.size
          ? { ...i, quantity: Math.min(10, Math.max(1, i.quantity + delta)) }
          : i,
      ),
    );
  }
  function remove(item: CartItem) {
    setCart((current) =>
      current.filter((i) => !(i.id === item.id && i.size === item.size)),
    );
    setLastRemoved(item);
  }
  function undoRemove() {
    if (!lastRemoved) return;
    const removed = lastRemoved;
    setCart((current) => {
      const match = current.find(
        (i) => i.id === removed.id && i.size === removed.size,
      );
      return match
        ? current.map((i) =>
            i === match
              ? { ...i, quantity: Math.min(10, i.quantity + removed.quantity) }
              : i,
          )
        : [...current, removed];
    });
    setLastRemoved(null);
  }
  function showSearch() {
    setSearchOpen(true);
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "instant" });
  }
  function joinNewsletter(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      localStorage.setItem("aeron:newsletter:v1", "interested");
      setNewsletter(
        "You’re on the list. Your interest is saved on this device; this concept store doesn’t send emails.",
      );
    } catch {
      setNewsletter(
        "Thanks for your interest. Your browser could not save the preference. This concept store doesn’t send emails.",
      );
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        <span>A little more freedom. A little less ordinary.</span>
        <span>
          Free shipping on orders over €150 <Icon name="arrow" size={13} />
        </span>
      </div>
      <header className="header">
        <a href="/" className="wordmark" aria-label="Aeron home" translate="no">
          AERON<span>®</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#collection">Shop sneakers</a>
          <a href="#story">Our story</a>
          <a href="#everyday">
            The everyday edit <span className="nav-dot" />
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button search-button"
            aria-label="Search sneakers"
            onClick={showSearch}
          >
            <Icon name="search" />
          </button>
          <button
            className="bag-button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open shopping bag, ${count} items`}
          >
            <Icon name="bag" />
            <span className="bag-label">Bag</span>
            <span className="bag-count">{count}</span>
          </button>
          <button
            className="icon-button menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="collection-label">
              <span /> The new everyday collection
            </div>
            <h1 id="hero-title">
              Good things.
              <br />
              In motion.
            </h1>
            <p>
              For the places you go.
              <br />
              And the way you get there.
            </p>
            <a className="button dark" href="#collection">
              Find your next pair <Icon name="arrow" />
            </a>
            <div className="hero-note">
              <span className="mini-mark">a.</span>
              <span>
                Designed with purpose.
                <br />
                Worn your way.
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <span className="hero-backdrop-word" aria-hidden="true">
              aeron
            </span>
            <ProductImage product={products[0]} priority />
            <div className="hero-product-label">
              <div>
                <span className="small-label">Your everyday, elevated.</span>
                <span>
                  Aeron Air 01 <span className="muted">/ Chalk & orange</span>
                </span>
              </div>
              <a
                href="?product=air-01"
                aria-label="Discover Aeron Air 01"
                className="round-link"
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  navigate({ product: "air-01" });
                }}
              >
                <Icon name="arrow" size={23} />
              </a>
            </div>
            <div className="hero-side-note">Built for wherever.</div>
          </div>
        </section>
        <div className="values-strip">
          <span>
            <Icon name="spark" size={18} /> Considered design
          </span>
          <span>
            <Icon name="box" size={18} /> Free shipping over €150
          </span>
          <span>
            <Icon name="return" size={18} /> 30 days to find your fit
          </span>
          <span className="last-value">
            Made for the everyday. Anything but ordinary.
          </span>
        </div>
        <section
          id="collection"
          className="collection section-wrap"
          aria-labelledby="collection-title"
        >
          <div className="section-heading">
            <div>
              <span className="small-label">The rotation</span>
              <h2 id="collection-title">Meet your everyday.</h2>
            </div>
            <p>
              Different days. Different directions.
              <br />
              One good place to start.
            </p>
          </div>
          <div className="collection-toolbar">
            <div
              className="filters"
              role="group"
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  className={category === route.category ? "active" : ""}
                  aria-pressed={category === route.category}
                  onClick={() => navigate({ category })}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="collection-tools">
              <span className="result-count" aria-live="polite">
                {visibleProducts.length} styles
              </span>
              <button
                className={`icon-button saved-filter ${savedOnly ? "is-saved" : ""}`}
                onClick={() => setSavedOnly((current) => !current)}
                aria-pressed={savedOnly}
                aria-label="Show favorite sneakers"
              >
                <Icon name="heart" size={18} />
              </button>
              <label className="sr-only" htmlFor="sort">
                Sort products
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </div>
          </div>
          {searchOpen ? (
            <div className="search-field">
              <Icon name="search" />
              <label className="sr-only" htmlFor="product-search">
                Search by name, color, or category
              </label>
              <input
                id="product-search"
                name="search"
                type="search"
                ref={searchRef}
                placeholder="Try “orange” or “court”…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="icon-button"
                aria-label="Close and clear search"
                onClick={() => {
                  setSearch("");
                  setSearchOpen(false);
                }}
              >
                <Icon name="close" />
              </button>
            </div>
          ) : null}
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article
                className={`product-card product-${product.image}`}
                key={product.id}
              >
                <div className="product-photo">
                  {product.tag ? (
                    <span
                      className={`product-tag ${product.tag === "New arrival" ? "new-tag" : ""}`}
                    >
                      {product.tag}
                    </span>
                  ) : null}
                  <button
                    className={`favorite icon-button ${saved.includes(product.id) ? "is-saved" : ""}`}
                    aria-label={`${saved.includes(product.id) ? "Unsave" : "Save"} ${product.name}`}
                    aria-pressed={saved.includes(product.id)}
                    onClick={() =>
                      setSaved((current) =>
                        current.includes(product.id)
                          ? current.filter((id) => id !== product.id)
                          : [...current, product.id],
                      )
                    }
                  >
                    <Icon name="heart" size={19} />
                  </button>
                  <a
                    href={`?product=${product.id}`}
                    className="product-image-link"
                    aria-label={`View ${product.name}`}
                    onClick={(e) => {
                      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)
                        return;
                      e.preventDefault();
                      navigate({ product: product.id });
                    }}
                  >
                    <ProductImage product={product} />
                  </a>
                  <button
                    className="quick-add"
                    aria-label={`Choose size for ${product.name}`}
                    onClick={() => navigate({ product: product.id })}
                  >
                    <Icon name="plus" size={20} />
                  </button>
                </div>
                <div className="product-info">
                  <div>
                    <h3>
                      <a
                        href={`?product=${product.id}`}
                        onClick={(e) => {
                          if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)
                            return;
                          e.preventDefault();
                          navigate({ product: product.id });
                        }}
                      >
                        {product.name}
                      </a>
                    </h3>
                    <p>{product.color}</p>
                  </div>
                  <span className="price">{money(product.price)}</span>
                </div>
                <div
                  className="color-options"
                  aria-label={`Available palette: ${product.color}`}
                >
                  {product.tones.map((tone, i) => (
                    <span
                      className={i === 0 ? "current-tone" : ""}
                      key={tone}
                      style={{ background: tone }}
                    />
                  ))}
                  <span className="color-count">{product.category}</span>
                </div>
              </article>
            ))}
          </div>
          {visibleProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No pairs here just yet.</h3>
              <p>
                Try another color or category, or explore the whole collection.
              </p>
              <button
                className="button dark"
                onClick={() => {
                  setSearch("");
                  setSavedOnly(false);
                  navigate({ category: "All sneakers" });
                }}
              >
                See all sneakers <Icon name="arrow" />
              </button>
            </div>
          ) : null}
          <div className="collection-bottom">
            <span>A good pair goes a long way.</span>
            <a href="#story">
              Get to know AERON <Icon name="arrow" size={17} />
            </a>
          </div>
        </section>
        <section
          id="story"
          className="story section-wrap"
          aria-labelledby="story-title"
        >
          <div className="story-photo">
            <img
              src="/images/story.jpg"
              width="1100"
              height="1375"
              alt="Runner in orange sneakers taking a flight of weathered stone steps"
              loading="lazy"
              onError={fallback}
            />
            <span className="photo-caption">Less rush. More rhythm.</span>
          </div>
          <div className="story-copy">
            <span className="small-label">A different kind of forward</span>
            <h2 id="story-title">
              Life moves.
              <br />
              Make it yours.
            </h2>
            <p>
              We believe the best things in life happen when you follow your own
              feet. A detour. A slow morning. One more block, just because.
            </p>
            <p>
              So we make sneakers for all of it. Thoughtful in their design.
              Effortless in your day. Made to feel like you, from the very first
              step.
            </p>
            <a href="#everyday" className="text-link">
              This is AERON <Icon name="arrow" size={19} />
            </a>
            <span className="story-signature" translate="no">
              aeron.
            </span>
          </div>
        </section>
        <section
          id="everyday"
          className="everyday section-wrap"
          aria-labelledby="everyday-title"
        >
          <div>
            <span className="small-label">The everyday edit</span>
            <h2 id="everyday-title">
              Less thinking.
              <br />
              More living.
            </h2>
            <p>
              A pair for the early coffee, the late train,
              <br />
              and everything that happens in between.
            </p>
            <button
              className="button dark"
              onClick={() => {
                navigate({ category: "Everyday" });
                setSavedOnly(false);
                setSearch("");
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "instant" });
              }}
            >
              Explore everyday essentials <Icon name="arrow" />
            </button>
          </div>
          <div className="edit-image">
            <ProductImage product={products[3]} />
            <span>Good from the ground up.</span>
          </div>
        </section>
        <section
          className="newsletter section-wrap"
          aria-labelledby="newsletter-title"
        >
          <div>
            <span className="small-label">Stay in the loop</span>
            <h2 id="newsletter-title">Good things on the way.</h2>
            <p>
              New drops, fresh perspectives, and a little AERON in your inbox.
            </p>
          </div>
          <form onSubmit={joinNewsletter}>
            <label htmlFor="email" className="sr-only">
              Your email address
            </label>
            <div className="email-field">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                required
                placeholder="Your email address…"
                aria-describedby="newsletter-note"
              />
              <button type="submit" aria-label="Join the newsletter">
                <Icon name="arrow" size={25} />
              </button>
            </div>
            <p id="newsletter-note" className="newsletter-note">
              A concept sign-up, saved on this device. No emails are sent.
            </p>
            <p className="newsletter-result" role="status">
              {newsletter}
            </p>
          </form>
        </section>
      </main>
      <footer className="footer section-wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="wordmark" translate="no">
              AERON<span>®</span>
            </a>
            <p>Made for your own pace.</p>
          </div>
          <div className="footer-links">
            <div>
              <h3>Explore</h3>
              <a
                href="#collection"
                onClick={() => {
                  navigate({ category: "All sneakers" });
                  setSearch("");
                  setSavedOnly(false);
                }}
              >
                All sneakers
              </a>
              <a href="#story">Our story</a>
              <a href="#everyday">The everyday edit</a>
            </div>
            <div>
              <h3>Here to help</h3>
              <button onClick={() => setInfo("shipping")}>
                Shipping & returns
              </button>
              <button onClick={() => setInfo("contact")}>
                Contact & fit help
              </button>
              <button onClick={() => setInfo("privacy")}>Privacy</button>
            </div>
            <div>
              <h3>A little closer</h3>
              <a href="#newsletter-title">The newsletter</a>
              <span>Designed for everywhere.</span>
              <span>Based in the everyday.</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} AERON. A fictional brand concept.
          </span>
          <span>
            EUR €{" "}
            <span className="footer-divider" aria-hidden="true">
              /
            </span>{" "}
            English
          </span>
          <span>
            Keep moving. Stay you.{" "}
            <span className="orange-star" aria-hidden="true">
              ✳
            </span>
          </span>
        </div>
        <p className="photo-credit">
          Illustrative product photography via Unsplash. No orders or payments
          are processed.
        </p>
      </footer>
      <div className={`toast ${notice ? "visible" : ""}`} role="status">
        {notice ? (
          <>
            <Icon name="check" size={18} />
            {notice}
          </>
        ) : null}
      </div>
      {route.product ? (
        <Modal
          title={activeProduct ? activeProduct.name : "Product not found"}
          className="product-modal"
          close={() => navigate({ product: null })}
        >
          {activeProduct ? (
            <ProductDetail
              key={activeProduct.id}
              product={activeProduct}
              add={add}
            />
          ) : (
            <div className="empty-state">
              <h2>This pair wandered off.</h2>
              <p>Choose a sneaker from the collection to see its details.</p>
              <button
                className="button dark"
                onClick={() => navigate({ product: null })}
              >
                Back to the collection
              </button>
            </div>
          )}
        </Modal>
      ) : null}
      {cartOpen ? (
        <Modal
          title="Shopping bag"
          className="cart-modal"
          close={() => setCartOpen(false)}
        >
          <div className="cart-heading">
            <span className="small-label">Good choices.</span>
            <h2>
              Your bag <span>({count})</span>
            </h2>
          </div>
          {lastRemoved ? (
            <div className="undo-message" role="status">
              Pair removed. <button onClick={undoRemove}>Undo</button>
            </div>
          ) : null}
          {cart.length ? (
            <>
              <div className="shipping-message">
                {subtotal >= 150 ? (
                  <>
                    <Icon name="check" size={16} /> Your bag qualifies for free
                    shipping.
                  </>
                ) : (
                  <>You’re {money(150 - subtotal)} away from free shipping.</>
                )}
              </div>
              <div className="cart-items">
                {cart.map((item) => {
                  const product = products.find((p) => p.id === item.id)!;
                  return (
                    <article
                      className="cart-item"
                      key={`${item.id}-${item.size}`}
                    >
                      <ProductImage product={product} />
                      <div className="cart-item-content">
                        <div className="cart-item-title">
                          <h3>{product.name}</h3>
                          <span>{money(product.price * item.quantity)}</span>
                        </div>
                        <p>{product.color}</p>
                        <p>Size EU {item.size}</p>
                        <div className="cart-item-actions">
                          <div className="quantity">
                            <button
                              aria-label={`Decrease ${product.name}, size ${item.size} quantity`}
                              disabled={item.quantity <= 1}
                              onClick={() => changeQuantity(item, -1)}
                            >
                              <Icon name="minus" size={14} />
                            </button>
                            <output
                              aria-label={`${product.name} quantity`}
                              aria-live="polite"
                            >
                              {item.quantity}
                            </output>
                            <button
                              aria-label={`Increase ${product.name}, size ${item.size} quantity`}
                              disabled={item.quantity >= 10}
                              onClick={() => changeQuantity(item, 1)}
                            >
                              <Icon name="plus" size={14} />
                            </button>
                          </div>
                          <button
                            className="remove-button"
                            aria-label={`Remove ${product.name}, size ${item.size}`}
                            onClick={() => remove(item)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="cart-summary">
                <div>
                  <span>Subtotal</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div>
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Complimentary" : money(shipping)}
                  </span>
                </div>
                <div className="total">
                  <span>Total</span>
                  <span>{money(subtotal + shipping)}</span>
                </div>
                <p>
                  Tax included. This concept store does not accept payments or
                  process orders.
                </p>
                <button
                  className="button dark full"
                  onClick={() => setCartOpen(false)}
                >
                  Keep exploring <Icon name="arrow" />
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state empty-bag">
              <Icon name="bag" size={42} />
              <h3>Room for a new favorite.</h3>
              <p>Your bag is empty. Your next everyday pair is waiting.</p>
              <button
                className="button dark"
                onClick={() => {
                  setCartOpen(false);
                  document
                    .getElementById("collection")
                    ?.scrollIntoView({ behavior: "instant" });
                }}
              >
                Explore the collection <Icon name="arrow" />
              </button>
            </div>
          )}
        </Modal>
      ) : null}
      {menuOpen ? (
        <Modal
          title="Navigation"
          className="menu-modal"
          close={() => setMenuOpen(false)}
        >
          <span className="wordmark" translate="no">
            AERON<span>®</span>
          </span>
          <nav aria-label="Mobile navigation">
            <a href="#collection" onClick={() => setMenuOpen(false)}>
              Shop sneakers <Icon name="arrow" />
            </a>
            <a href="#story" onClick={() => setMenuOpen(false)}>
              Our story <Icon name="arrow" />
            </a>
            <a href="#everyday" onClick={() => setMenuOpen(false)}>
              The everyday edit <Icon name="arrow" />
            </a>
          </nav>
          <p>Made for your own pace.</p>
        </Modal>
      ) : null}
      {info ? (
        <Modal
          title={information[info].title}
          className="info-modal"
          close={() => setInfo(null)}
        >
          <span className="small-label">AERON, with care.</span>
          <h2>{information[info].title}</h2>
          <p>{information[info].body}</p>
          <button className="button dark" onClick={() => setInfo(null)}>
            Got it <Icon name="check" />
          </button>
        </Modal>
      ) : null}
    </>
  );
}

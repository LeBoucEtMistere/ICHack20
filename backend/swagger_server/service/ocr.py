from google.cloud import vision
import io
import re
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "swagger_server/firebase_key.json"

client = vision.ImageAnnotatorClient()


def process_image(image_file):
    with io.open(image_file, 'rb') as image_file:
        content = image_file.read()
    image = vision.types.Image(content=content)
    # response = client.document_text_detection(image=image)
    response = client.text_detection(image=image)
    document = response.text_annotations[1:]

    items = []
    lines = {}
    tally = {}
    tally2 = {}
    total = -1

    first_line = document[0].description

    for text in document:
        top_x_axis = text.bounding_poly.vertices[0].x
        top_y_axis = text.bounding_poly.vertices[0].y
        bottom_y_axis = text.bounding_poly.vertices[3].y

        if top_y_axis not in lines:
            lines[top_y_axis] = [(top_y_axis, bottom_y_axis), []]

        for s_top_y_axis, s_item in lines.items():
            if top_y_axis < s_item[0][1]:
                lines[s_top_y_axis][1].append((top_x_axis, text.description))
                break

    for _, item in lines.items():
        if item[1]:
            words = sorted(item[1], key=lambda t: t[0])
            items.append(
                (item[0], ' '.join([word for _, word in words]), words))

    for i in range(len(items)):
        items[i] = items[i][1]

    orders = []
    pattern = re.compile(
        "(([0-9]?[x]?[ ]?)([0-9a-zA-Z.']+[ ])+[$£€]?[0-9]+\.[0-9][0-9])")

    total_regex = re.compile(
        "(([0-9]+/[0-9]+)?[ ]?([0-9]+[:][0-9]+)?)?[ ]?((BALANCE DUE)?(Amount)?((Total)?(total)?(TOTAL)?[ ]?(Due)?(TO PAY)?))[ ]?[:]?[ ]?(([£$€]?)([0-9]+[.][0-9][0-9]))")

    for i in range(len(items)):
        if pattern.match(items[i]) and not total_regex.match(items[i]) and not re.match("Total Tax", items[i]) and not re.match("Tax", items[i]) and not re.match("Sales Tax", items[i]) and not re.match("Visa", items[i]) and not re.match("Subtotal", items[i]):
            orders.append(items[i])

    price = "[0-9]+\.[0-9]+"

    for i in orders:
        p = re.findall(price, i)[0]
        tally[i.split(p)[0]] = float(p)

    tally2["store"] = first_line

    for i in range(len(items)):
        if "$" in items[i]:
            currency = "USD"
        elif "€" in items[i]:
            currency = "EUR"
        elif "£" in items[i]:
            currency = "GBP"
        else:
            currency = "UKN"

        if total_regex.match(items[i]) and not re.match("[$]?[0-9]+\.[0-9][0-9]", items[i]):
            tot = items[i]
            p = re.findall(price, tot)[0]
            tally2["total"] = float(p)
            break
        else:
            tot = -1
    tally2["currency"] = currency

    return tally, tally2

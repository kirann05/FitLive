import CoreGraphics
// Reproduce the native app icons from the same simple waveform used on the web.
import Foundation
import ImageIO

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
for platform in ["ios", "watch"] {
  let folder = root.appendingPathComponent(
    platform == "ios"
      ? "apps/ios/FitLive/Assets.xcassets/AppIcon.appiconset"
      : "apps/watch/FitLiveWatch/Assets.xcassets/AppIcon.appiconset")
  try FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
  let context = CGContext(
    data: nil, width: 1024, height: 1024, bitsPerComponent: 8, bytesPerRow: 4096,
    space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
  context.setFillColor(CGColor(red: 232.0 / 255, green: 240.0 / 255, blue: 246.0 / 255, alpha: 1))
  context.fill(CGRect(x: 0, y: 0, width: 1024, height: 1024))
  context.setStrokeColor(CGColor(red: 56.0 / 255, green: 95.0 / 255, blue: 112.0 / 255, alpha: 1))
  context.setLineWidth(64)
  context.setLineCap(.round)
  context.setLineJoin(.round)
  let points: [(Double, Double)] = [(7, 25), (15, 25), (20, 12), (28, 37), (33, 25), (41, 25)]
  for (i, p) in points.enumerated() {
    let point = CGPoint(x: p.0 / 48 * 1024, y: (48 - p.1) / 48 * 1024)
    if i == 0 { context.move(to: point) } else { context.addLine(to: point) }
  }
  context.strokePath()
  let destination = CGImageDestinationCreateWithURL(
    folder.appendingPathComponent("AppIcon.png") as CFURL, "public.png" as CFString, 1, nil)!
  CGImageDestinationAddImage(destination, context.makeImage()!, nil)
  precondition(CGImageDestinationFinalize(destination))
  let contents: [String: Any] = [
    "images": [
      [
        "filename": "AppIcon.png", "idiom": "universal",
        "platform": platform == "ios" ? "ios" : "watchos", "size": "1024x1024",
      ]
    ], "info": ["author": "xcode", "version": 1],
  ]
  try JSONSerialization.data(withJSONObject: contents, options: [.prettyPrinted, .sortedKeys])
    .write(to: folder.appendingPathComponent("Contents.json"))
}

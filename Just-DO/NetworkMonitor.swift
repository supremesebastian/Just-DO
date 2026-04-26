import Foundation
import Network
import Combine

@MainActor
final class NetworkMonitor: ObservableObject {
    enum Status {
        case unknown
        case online
        case offline
        case constrained
    }

    @Published private(set) var status: Status = .unknown

    private let monitor = NWPathMonitor()
    private let queue = DispatchQueue(label: "NetworkMonitor")

    init() {
        monitor.pathUpdateHandler = { [weak self] path in
            Task { @MainActor [weak self] in
                guard let self else { return }
                if path.status == .satisfied {
                    self.status = path.isConstrained || path.isExpensive ? .constrained : .online
                } else {
                    self.status = .offline
                }
            }
        }
        monitor.start(queue: queue)
    }

    deinit {
        monitor.cancel()
    }

    var isOffline: Bool { status == .offline }
}
